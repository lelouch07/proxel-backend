// Helper function to generate a unique numeric projectID
function generateUniqueProjectID() {
    // You can customize the generation logic based on your requirements.
    // Here, we generate a unique numeric ID based on a timestamp and a random number.
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000); // Adjust the range as needed.
    return timestamp + random;
}
export {generateUniqueProjectID};