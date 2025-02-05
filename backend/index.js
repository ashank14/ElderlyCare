import express from "express"
import cors from "cors"
import router from "./routes/router.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());

const dbURI = process.env.MONGO_URI;
console.log(dbURI);

  try {
    console.log("hello");
    await mongoose.connect(dbURI, {});
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }


app.use('/api',router);

app.listen(8000,()=>console.log("backend running"));
