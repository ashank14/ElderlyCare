import express from "express"
import cors from "cors"
import router from "./routes/router.js";
import mongoose from "mongoose";

const app=express();
app.use(cors());
app.use(express.json());

app.use('/api',router);

app.listen(8000,()=>console.log("backend running"));
