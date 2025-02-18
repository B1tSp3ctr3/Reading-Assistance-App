import fs from "fs";
import path from "path";

const imageDirectory = path.join("./uploads");
const textDirectory = path.join("./texts") // Adjust path as needed

export const imageController = (req, res) => {
  try {
    const files = fs.readdirSync(imageDirectory);
    const textFiles = fs.readdirSync(textDirectory);

    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );
    const textfiles = textFiles.filter((file)=> /\.txt$/i.test(file));
    const textPaths = textfiles.map((file) => 
        path.join("./texts", file)
    );
    // Create full URLs or paths for the images
    const imagePaths = imageFiles.map((file) =>
      path.join("./uploads", file) // Path for the UI
    );

    // Send the list of image paths
    return res.json({ images: imagePaths , texts: textPaths });
  } catch (err) {
    console.error("Error listing images:", err);
    return res.status(500).json({ error: "Unable to list images" });
  }
};