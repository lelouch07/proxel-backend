const AWS = require("aws-sdk");


const environment = process.env.BUN_ENV || 'development';

if (environment === 'development') {
    AWS.config.update({
        region: "kolhapur",
        endpoint: "http://localhost:8000"
    });
}
else
{
    // Configure AWS SDK to use actual AWS services
    AWS.config.update({
        region: 'your-aws-region',
        // Set your actual AWS access key and secret key here or use IAM roles if deployed to AWS.
    });
}
//Configure AWS SDK
// Create DynamoDB and S3 instances
const dynamodb = new AWS.DynamoDB();
const s3 = new AWS.S3();
export default dynamodb;




//To check the tables in the DynamoDB

//aws dynamodb list-tables --endpoint-url http://localhost:8000




//To print the content of the DynamoDB
//aws dynamodb scan --table-name TableName --endpoint-url http://localhost:8000
