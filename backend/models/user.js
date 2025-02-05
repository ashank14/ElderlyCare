import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: false },
  createdAt: { type: Date, default: Date.now },
});

// Create a model
const userModel = mongoose.model("User", userSchema);

export default userModel;