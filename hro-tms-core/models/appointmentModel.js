import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  subject: String,
  date: Date,
  startTime: String,
  endTime: String,
  description: String,
  area: String,
  location: String,
  timestamp: Date,
  updatedAt: Date,
});

export default mongoose.model("Appointment", AppointmentSchema);
