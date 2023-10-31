import AWS from 'aws-sdk';
import dynamodb from './dynamoDBConfig';
import { generateUniqueProjectID } from '../utils/generateUniqueProjectID';

// Helper function to create the Projects table
async function createProjectsTable() {
    const params = {
        TableName: 'Projects',
        KeySchema: [
            { AttributeName: 'ProjectID', KeyType: 'HASH' }, // Partition key
        ],
        AttributeDefinitions: [
            { AttributeName: 'ProjectID', AttributeType: 'N' }, // N for Numeric
            // Define other attributes as needed
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        },
        StreamSpecification: {
            StreamEnabled: false,
        },
        tableClass: 'STANDARD',
    };

    dynamodb.createTable(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Projects Table created successfully:', data);
        }
    });
}

// Helper function to get a project by projectID
async function getProject(projectID: number) {
    try {
        const params = {
            TableName: 'Projects',
            Key: { ProjectID: { N: projectID } }, // Convert to string
        };
        const result = await dynamodb.getItem(params).promise();
        return result.Item ? AWS.DynamoDB.Converter.unmarshall(result.Item) : null;
    } catch (err) {
        console.log('Error in getting project', err);
        throw err;
    }
}

// Helper function to create a new project with a generated projectID
async function createProject(projectData,UserID) {
    const projectID = generateUniqueProjectID();

    const params = {
        TableName: 'Projects',
        Item: AWS.DynamoDB.Converter.marshall({
            ProjectID: projectID,
            UserID:UserID,
            ProjectData:projectData // No need to convert to string
            // Define other project attributes here
        }),
    };

    try {
        await dynamodb.putItem(params).promise();
        return projectID; // Return the generated projectID
    } catch (error) {
        console.log('Error while creating a project', error);
        throw error;
    }
}



export { createProjectsTable, getProject, createProject };
