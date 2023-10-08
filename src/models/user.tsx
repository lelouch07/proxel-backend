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
            console.log('Table created successfully:', data);
    });
}

export default createUserTable();