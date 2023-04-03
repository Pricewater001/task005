const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
    console.log("connected");
  } catch (error) {
    console.log("error : HAssan");
    console.log(error.message);
  }
};

module.exports = connectDB;