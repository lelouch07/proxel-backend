// const AWS = require("aws-sdk");
// const environment = process.env.BUN_ENV || 'development';

// if (environment === 'development') {
//     AWS.config.update({
//         region: "kolhapur",
//         endpoint: "http://localhost:8000"
//     });
// }
// else
// {
//     // Configure AWS SDK to use actual AWS services
//     AWS.config.update({
//         region: 'your-aws-region',
//         // Set your actual AWS access key and secret key here or use IAM roles if deployed to AWS.
//     });
// }

// const s3 = new AWS.S3();

// async function uploadImageToS3(bucketName, key, imageBuffer) {
//     const params = {
//         Bucket: bucketName,
//         Key: key,
//         Body: imageBuffer,
//     };

//     try {
//         await s3.upload(params).promise();
//         console.log(`Image ${key} uploaded to S3 Local`);
//     } catch (error) {
//         console.error(`Error uploading image to S3: ${error}`);
//         throw error;
//     }
// }

// export { uploadImageToS3 };
