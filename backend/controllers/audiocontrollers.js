import mongoose from "mongoose";

export const audioController = async (req, res) => {
    try {
        const { fileId } = req.params;

        // Ensure the database connection is established
        if (!mongoose.connection.db) {
            return res.status(500).json({ error: "Database connection not established" });
        }

        // Validate fileId format before converting to ObjectId
        if (!mongoose.Types.ObjectId.isValid(fileId)) {
            return res.status(400).json({ error: "Invalid file ID format" });
        }

        // Convert fileId to ObjectId using correct approach
        const objectId = new mongoose.Types.ObjectId(fileId.toString()); 

        // Create GridFS bucket instance
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: "audio",
        });

        // Open a download stream
        const downloadStream = bucket.openDownloadStream(objectId);

        // Set response headers
        res.set("Content-Type", "audio/mp3");
        downloadStream.pipe(res);

        // Handle stream errors
        downloadStream.on("error", (err) => {
            console.error("GridFS Download Error:", err);
            res.status(500).json({ error: "Error retrieving file from MongoDB" });
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
