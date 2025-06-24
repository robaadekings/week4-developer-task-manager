
const mongoose = require("mongoose");

//connect to mongodb using mongoose

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB connected successfully");

    }catch (error) {
        console.error("mongoDb connection failled: ", error.message);
        process.exit(1);

    }
};

module.exports = connectDB;