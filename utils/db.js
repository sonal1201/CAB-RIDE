const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Mongoose DB is connected")
    } catch (error) {
        console.log("MongoDB Connection Error", error);
        process.exit(1);
    }
}

module.exports = connectDb;