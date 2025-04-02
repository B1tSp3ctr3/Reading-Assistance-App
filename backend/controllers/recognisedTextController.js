// Desc: Controller for listing all the recognised text
import Text from "../models/text.js";



export const recognisedTextController = async (req, res) => {
  //listing all the enteries of Text model using Try and catch
  // console.log(req);
  try {
    const texts = await Text.find();
    return res.json({ texts });
  } catch (error) {
    console.log("Hello");
    console.error("Error listing texts:", error);
    return res.status(500).json({ error: "Unable to list texts" });
  }
};