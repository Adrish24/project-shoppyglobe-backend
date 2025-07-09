import mongoose from "mongoose";

function connectDB(url) {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.log("MongoDB connection failed", err));
}

export default connectDB;
