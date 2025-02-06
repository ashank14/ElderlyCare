
import mongoose from "mongoose";

const healthTrackingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  healthMetrics: [
    {
      metricName: { type: String, required: true }, // e.g., 'weight', 'blood pressure'
      value: { type: String, required: true }, // The value of the metric
      unit: { type: String, required: true }, // e.g., 'kg', 'mmHg'
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const healthModel = mongoose.model('HealthTracking', healthTrackingSchema);

export default healthModel;