import dynamodb from './dynamoDBConfig';
async function createUserTable() {
    const params = {
        TableName: 'Users',
        KeySchema: [
            { AttributeName: 'Email', KeyType: 'HASH' },
            { AttributeName: 'Age', KeyType: 'RANGE' }, // Partition key
        ],
        AttributeDefinitions: [
            // { AttributeName: 'UserID', AttributeType: 'S' }, // S for String (matches KeyType)
            { AttributeName: 'Email', AttributeType: 'S' },
            { AttributeName: 'Age', AttributeType: 'N' }, // N for Number
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
    };



    dynamodb.createTable(params, (err, data) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Table created successfully:', data);
        }
    });
}

export default createUserTable();