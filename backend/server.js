const app = require('./src/app');
require('./src/config/redis'); // Ensure Redis connection is established
const connectDB = require('./src/config/database');
const mongoose = require("mongoose")

// Connect to MongoDB
connectDB();

mongoose.connection.once('open', async () => {
    try {
        await User.collection.dropIndex('googleId_1');
        console.log("Old Index is Deleted!");
    } catch (err) {
        console.log("Index is not Found or Already Deleted.");
    }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});