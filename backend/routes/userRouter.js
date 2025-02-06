import { Router } from "express";
import userModel from '../models/user.js'
import sendEmail from "../utils/sendEmail.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import passport from "passport";
import mongoose from "mongoose";
import pillModel from "../models/pillSchema.js";
import healthModel from "../models/healthSchema.js";
import blogModel from "../models/blogSchema.js";

const userRouter=Router();

userRouter.get('/',(req,res)=>{
    return res.json({msg:"user router helloo"});
})

userRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    let user = await userModel.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });

    // Generate a JWT token for email verification
    const token = jwt.sign({ email, password, username }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send the email with the verification token
    await sendEmail(email, token);

    res.json({ msg: "Verification email sent. Please check your inbox." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


userRouter.get("/verify-email", async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ error: "Invalid or missing token" });

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user already exists (to prevent duplicate signups)
    let userExists = await userModel.findOne({ email: decoded.email });
    if (userExists) return res.status(400).json({ error: "User already verified" });

    // Create a new user only after verification
    const newUser = new userModel({
      email: decoded.email,
      password: decoded.password, // Make sure to hash passwords in production!
      username: decoded.username,
      verified: true, // Mark user as verified
    });

    await newUser.save();
    res.json({ msg: "Email verified successfully! You can now log in." });
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
});

// Login with Email
userRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ msg: "Login successful", token });
  })(req, res, next);
});

// Google OAuth Login
userRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth Callback
userRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user; // This should now be populated correctly
    if (!user) {
      return res.status(400).send({ error: "Authentication failed." });
    }

    const userId = user._id;
    console.log(userId); // Should print the userId now

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.redirect(`http://localhost:5173/details?userId=${userId}`);
  }
);



// Update user profile
userRouter.put("/updateProfile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const { name, dateOfBirth, address, ifHistory, medicalHistory, age,weight } = req.body;

        // Validate if the userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ error: "Invalid userId format" });
        }

    // Find the user by ID and update their profile
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        name,
        dateOfBirth,
        address,
        ifHistory,
        medicalHistory,
        age,
        weight
        
      },
      { new: true, runValidators: true } // Return updated document & validate input
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ msg: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add medication
userRouter.post("/addMedication/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { medicationName, description, dosage, frequency, startDate, endDate } = req.body;

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $push: {
          medications: {
            medicationName,
            description,
            dosage,
            frequency,
            startDate,
            endDate,
          },
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ msg: "Medication added successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all medications
userRouter.get("/getMedications/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ medications: user.medications });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete medication
userRouter.delete("/deleteMedication/:userId/:medicationId", async (req, res) => {
  try {
    const { userId, medicationId } = req.params;

    // Validate userId and medicationId format
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(medicationId)) {
      return res.status(400).json({ error: "Invalid userId or medicationId format" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $pull: { medications: { _id: medicationId } },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ msg: "Medication deleted successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all medications
userRouter.get("/getMedications/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ medications: user.medications });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update medication
userRouter.put("/updateMedication/:userId/:medicationId", async (req, res) => {
  try {
    const { userId, medicationId } = req.params;
    const { medicationName, description, dosage, frequency, startDate, endDate } = req.body;

    // Validate userId and medicationId format
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(medicationId)) {
      return res.status(400).json({ error: "Invalid userId or medicationId format" });
    }

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId, "medications._id": medicationId },
      {
        $set: {
          "medications.$.medicationName": medicationName,
          "medications.$.description": description,
          "medications.$.dosage": dosage,
          "medications.$.frequency": frequency,
          "medications.$.startDate": startDate,
          "medications.$.endDate": endDate,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User or medication not found" });
    }

    res.json({ msg: "Medication updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

userRouter.post("/logPill/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { medicationId, timeDispensed, taken, missed, reason } = req.body;

    // Validate userId (check if user exists)
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate medicationId (check if medication exists for the user)
    const medication = user.medications.id(medicationId); // Assuming medicationId is part of the user's medications array
    if (!medication) {
      return res.status(404).json({ error: "Medication not found for the user" });
    }

    // Create a new pill log entry
    const pillLog = new pillModel({
      userId,
      medicationId,
      timeDispensed,
      taken,
      missed,
      reason
    });

    // Save the pill log entry
    await pillLog.save();

    // Return success response
    res.status(201).json({ msg: "Pill log created successfully", pillLog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



userRouter.put("/logPill/:pillLogId", async (req, res) => {
  try {
    const { pillLogId } = req.params;
    const { taken, missed, reason } = req.body;

    // Find the pill log entry by pillLogId
    const pillLog = await pillModel.findById(pillLogId);
    if (!pillLog) {
      return res.status(404).json({ error: "Pill log not found" });
    }

    // Update the pill log status
    pillLog.taken = taken !== undefined ? taken : pillLog.taken;
    pillLog.missed = missed !== undefined ? missed : pillLog.missed;
    pillLog.reason = reason !== undefined ? reason : pillLog.reason;

    // Save the updated pill log entry
    await pillLog.save();

    res.json({ msg: "Pill log updated successfully", pillLog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

userRouter.post("/pubBlog", async (req, res) => {
  try {
    const { title, content, tags, imageUrl } = req.body;
    const userId = req.user.id;  // Assuming you are using JWT authentication

    const newBlog = new Blog({
      title,
      content,
      author: userId,
      tags,
      imageUrl,
      status: 'draft', // Default status is draft
    });

    await newBlog.save();
    res.status(201).json({ msg: "Blog created successfully", blog: newBlog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




userRouter.get("/blogs", async (req, res) => {
  try {
    const blogs = await blogModel.find().populate('author', 'username'); // Populate author details
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

userRouter.get("/blogs/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await blogModel.findById(blogId).populate('author', 'username');

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


userRouter.post("/blogs/:blogId/comments", async (req, res) => {
  try {
    const { blogId } = req.params;
    const { content } = req.body;
    const userId = req.user.id; // Assuming you're using JWT for authentication

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const newComment = {
      userId,
      content,
    };

    blog.comments.push(newComment);
    await blog.save();

    res.json({ msg: "Comment added successfully", comment: newComment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

userRouter.get("/blogs/:blogId/comments", async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await blogModel.findById(blogId).populate('comments.userId', 'username'); // Populate the commenter's username

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(blog.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Get health metrics for a user
userRouter.get("/health-metrics/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find health data for the user
    const healthData = await healthModel.findOne({ userId });

    if (!healthData) {
      return res.status(404).json({ error: "No health metrics found for this user" });
    }

    // Return only the array of health metrics
    res.json(healthData.healthMetrics);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


userRouter.post("/addHealth", async (req, res) => {
  try {
    const { userId, healthMetrics, unit } = req.body;

    if (!userId || !healthMetrics || !Array.isArray(healthMetrics)) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    // Create a new health tracking entry
    const newHealthEntry = new healthModel({
      userId,
      healthMetrics,
      unit
    });

    await newHealthEntry.save();
    res.status(201).json({ message: "Health metrics added successfully", data: newHealthEntry });

  } catch (error) {
    console.error("Error adding health metrics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Store medicine schedule
let medicineSchedule = {
    med1: { name: "Paracetamol", time: "18:00" },
    med2: { name: "Aspirin", time: "18:03" },
    med3: { name: "Vitamin C", time: "16:00" },
    med4: { name: "Ibuprofen", time: "20:00" }
};

// Endpoint to receive medicine data from user
userRouter.post("/setSchedule", (req, res) => {
    console.log(req.body);
    const { med1, med2, med3, med4 } = req.body;
    if (!med1 || !med2 || !med3 || !med4) {
        return res.status(400).json({ error: "All four medicines and times are required!" });
    }

    medicineSchedule = { med1, med2, med3, med4 };
    console.log("Updated Schedule:", medicineSchedule);
    res.json({ message: "Schedule updated successfully!" });
});

// ESP fetches the latest medicine schedule
userRouter.get("/getSchedule", (req, res) => {
    res.json(medicineSchedule);
});


export default userRouter;