import mongoose from "mongoose";

const pillLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medication', required: true },
  timeDispensed: { type: Date, required: true },
  taken: { type: Boolean, default: false }, // If the pill was taken
  missed: { type: Boolean, default: false }, // If the pill was missed
  reason: { type: String }, // Optional reason for missing the pill
  createdAt: { type: Date, default: Date.now },
});

const pillModel = mongoose.model('PillLog', pillLogSchema);

export default pillModel;