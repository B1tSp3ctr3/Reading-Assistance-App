// controller to delete saved text and corresponding audio file that is stored directly on server
import express from "express";
import Text from "../models/text.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

export const deleteTextController = async (req, res) => {

    
        const id = req.params.id;
        // checking if id is valid or not
        if (!id) {
            return res.status(400).json({ error: "Invalid ID" });
        }
        
        //now convert id in object id
        
        // checking if id is valid or not
        if (!id) {
            return res.status(400).json({ error: "Invalid ID" });
        }
        // checking if id is valid or not
        if (id.length !== 24) {
            return res.status(400).json({ error: "Invalid ID" });
        }
        const text = await Text.findById({_id :id});
        // console.log(text.text);
        if (!text) {
            return res.status(404).json({ error: "Text not found" });
        }
    try{    // taking name of audio file from text (extract last 24 characters from text.fileURL)


        const audioFileName = text.fileURL.slice(-24);
        // audio file is located in public/audio directory
        const __dirname = dirname(fileURLToPath(import.meta.url));
        const audioFilePath = path.join(__dirname, "../public/audio", audioFileName);
        // deleting the audio file
        // console.log("Audio file path:", audioFilePath);
        await fs.promises.unlink(audioFilePath);
    }catch(err){
        console.error("Error deleting audio file:", err);
        return res.status(500).json({ error: "Unable to delete audio file" });
    }
    // deleting the text file
    try{    //text file is stored in mongoDB
        await Text.findByIdAndDelete({_id :id});
    }
    catch(error) {
        console.error("Error deleting text:", error);
        return res.status(500).json({ error: "Unable to delete text" });
    }

    return res.status(200).json({ message: "Text and corresponding audio file deleted successfully" });

};
