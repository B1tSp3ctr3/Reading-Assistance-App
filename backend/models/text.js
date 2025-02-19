import mongoose from "mongoose";

const TextSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    textFileName: {
      type: String,
      required: true,
    },
    textFilePath: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

export default mongoose.model("Text", TextSchema);
