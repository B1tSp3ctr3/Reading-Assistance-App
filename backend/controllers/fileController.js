import mongoose from "mongoose";

export const getAudioFile = async (req, res) => {
  try {
    const { fileId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return res.status(400).json({ error: "Invalid file ID format" });
    }

    const objectId = new mongoose.Types.ObjectId(fileId);
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "audio",
    });

    const downloadStream = bucket.openDownloadStream(objectId);

    res.set("Content-Type", "audio/mp3");
    downloadStream.pipe(res);

    downloadStream.on("error", (err) => {
      console.error("❌ GridFS Download Error:", err);
      res.status(500).json({ error: "Error retrieving file from MongoDB" });
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
