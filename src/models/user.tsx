import AWS from 'aws-sdk';
import dynamodb from './dynamoDBConfig';
async function createUserTable() {
    const params = {
        TableName: 'Users',
        KeySchema: [
            // { AttributeName: 'Email', KeyType: 'HASH' },
            { AttributeName: 'UserID', KeyType: 'HASH' }, // Partition key
        ],
        AttributeDefinitions: [
            { AttributeName: 'UserID', AttributeType: 'S' }, // S for String (matches KeyType)
            // { AttributeName: 'Email', AttributeType: 'S' },
            // { AttributeName: 'Age', AttributeType: 'N' }, // N for Number
            // { AttributeName: 'ProfilePicture', AttributeType: 'S' },
            // { AttributeName: 'PasswordHash', AttributeType: 'S' },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        },
        StreamSpecification: {
            StreamEnabled: false,
        },
        tableClass:'STANDARD',
    };



    dynamodb.createTable(params, (err, data) => {
        if(err)
        {
            console.log(err);
        }
        else
            console.log('Table created successfully:', data);
    });
}



// Helper function to get a user by ID
async function getUser(userId: string) {
    try{

        const params = {
            TableName: 'Users',
            Key: { UserID: { S: userId } },
        };
        const result = await dynamodb.getItem(params).promise();
        return result.Item ? AWS.DynamoDB.Converter.unmarshall(result.Item) : null;
    }catch(err){
        console.log('Error in getting user', err);
        throw err;

    }
}

// Helper function to create a new user
async function createUser(userId: string, email: string, age: number, passwordHash: string) {
    const params = {
        TableName: 'Users',
        Item: AWS.DynamoDB.Converter.marshall({ UserID: userId, Email: email, Age: age, PasswordHash: passwordHash }),
    };
    try {
        await dynamodb.putItem(params).promise();
    }
    catch (error) {
        console.log("inside the create user sign up block");
        // console.error();
    }
}

export { createUserTable, getUser, createUser };
