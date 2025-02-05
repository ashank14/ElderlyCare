import { Router } from "express";
import userModel from '../models/user.js'

const userRouter=Router();

userRouter.get('/',(req,res)=>{
    return res.json({msg:"user router helloo"});
})


userRouter.post("/signup", async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
  
      
  
      // Create a new user
      const newUser = await userModel.create({
        email,
        password,
        username
      });
  
      await newUser.save();
  
  
      res.status(201).json({ msg: "Signup successful" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default userRouter;