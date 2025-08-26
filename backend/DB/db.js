import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongoDB Connected");
  } catch (err) {
    console.log(`this is an error from connectDb ${err}`);
    process.exit(1);
  }
};
