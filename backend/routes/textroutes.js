import express from "express";
import multer from "multer";
import { recognizeText } from "../controllers/textcontrollers.js";

const router = express.Router();
// const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,"./uploads");
    },
    filename: function(req,file,cb){
        cb(null,`Untitled ${Date.now()}.png`);
    }
})

const upload = multer({storage});
router.post("/recognize", upload.single("image"), recognizeText);


export default router;
//hh