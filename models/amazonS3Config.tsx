// const AWS = require('aws-sdk');

// // ... AWS SDK configuration ...

// // Create an S3 instance
// const s3 = new AWS.S3();

// // Function to upload a user's profile picture to S3
// const uploadProfilePicture = async (userId, fileBuffer, fileType) => {
//     const params = {
//         Bucket: 'your-s3-bucket-name',
//         Key: `profile-pictures/${userId}.${fileType}`, // Unique key based on user ID and file type
//         Body: fileBuffer, // Binary image data
//         ContentType: `image/${fileType}`, // Set the content type based on the file type (e.g., 'image/png')
//     };

//     try {
//         const uploadResult = await s3.upload(params).promise();
//         return uploadResult.Location; // URL of the uploaded image in S3
//     } catch (error) {
//         console.error('Error uploading profile picture to S3:', error);
//         throw error;
//     }
// };

// // Example usage of the uploadProfilePicture function:
// const userId = 'uniqueUserId';
// const fileBuffer = ...; // Binary image data (e.g., read from a file)
// const fileType = 'png'; // File type (e.g., 'png' or 'jpg')

// uploadProfilePicture(userId, fileBuffer, fileType)
//     .then((imageUrl) => {
//         // Store the imageUrl in your DynamoDB User schema or use it as needed.
//         console.log('Profile picture uploaded:', imageUrl);
//     })
//     .catch((error) => {
//         console.error('Error uploading profile picture:', error);
//     });
