import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: false },
  username:{type:String},
  password: { type: String, required: false }, // You should hash the password before saving it.
  dateOfBirth: { type: Date },
  address:{type:String},
  age:{type:Number},
  ifHistory:{type:Boolean,required:false},
  medicalHistory:[
    {
      diseaseName:{type:String,required:false},
      description:{type:String,required:false}
    }
  ],
  medications: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Auto-generated for each medication
      medicationName: { type: String, required: false },
      description:{type:String, required:false},
      dosage: { type: String, required: false }, // e.g., '1 pill' or '10 mg'
      frequency: { type: String, required: false }, // e.g., 'daily', 'every 6 hours'
      startDate: { type: Date, required: false },
      endDate: { type: Date }, // If medication has a start and end period.
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const userModel = mongoose.model('User', userSchema);

export default userModel;