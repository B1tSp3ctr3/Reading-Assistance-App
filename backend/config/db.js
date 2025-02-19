import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/RAD_database", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// Define gfs variable
let gfs;

mongoose.connection.once("open", () => {
  console.log("GridFSBucket is being initialized...");
  const db = mongoose.connection.db;
  gfs = new mongoose.mongo.GridFSBucket(db, { bucketName: "audio" });
});

// Function to get gfs safely after initialization
const getGFS = () => {
  if (!gfs) {
    throw new Error("GridFSBucket not initialized yet. Ensure DB connection is established before accessing gfs.");
  }
  return gfs;
};

// Export both connectDB and the getter for gfs
export default connectDB;
export { getGFS };
