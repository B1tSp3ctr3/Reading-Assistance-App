import express from "express";
import dotenv from "dotenv";
// import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import textRoutes from "./routes/textroutes.js";
import recognisedTextRoutes from "./routes/recognisedTextRoutes.js";
import testSaveRoutes from "./routes/textSaveRoutes.js";
import ttsRoutes2 from "./routes/ttsroutes2.js";
import deleteTextRoutes from "./routes/deleteTextRoute.js";

dotenv.config();
connectDB();
const audioDir = "./public/audio";
const app = express();
// app.use(cors({ origin: "*" }));  // Allow requests from any domain

// app.use(cors());
app.use(bodyParser.json());
// app.use("/auth", authRoutes);
app.use("/text", textRoutes);
app.use("/recognisedtext", recognisedTextRoutes);
app.use("/database", testSaveRoutes);
app.use("/tts2", ttsRoutes2);
app.use("/audio", express.static(audioDir));
app.use("/deleteText", deleteTextRoutes);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Listening to ... ${PORT}`));
