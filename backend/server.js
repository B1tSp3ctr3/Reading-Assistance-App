import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authroutes.js";
import textRoutes from "./routes/textroutes.js";
// import ttsRoutes from "./routes/ttsroutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/text", textRoutes);
// app.use("/tts", ttsRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Listening to ... ${PORT}`));