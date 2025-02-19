import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authroutes.js";
import textRoutes from "./routes/textroutes.js";
import recognisedTextRoutes from "./routes/recognisedTextRoutes.js";
import ttsRoutes from "./routes/ttsroutes.js";
import audioRoutes from "./routes/audioroutes.js";

// import mongoose from "mongoose";

// mongoose.connect("moongodb://localhost:27017/ReadingAssitanceApp", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {;
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/text", textRoutes);
app.use("/recognisedtext", recognisedTextRoutes);
app.use("/tts", ttsRoutes);
app.use("/audio", audioRoutes);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Listening to ... ${PORT}`));
