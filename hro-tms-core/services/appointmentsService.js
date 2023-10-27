import appointmentModel from "../models/appointmentModel";

export const createAppointment = async (data) => {
  try {
    const timeNow = new Date().toISOString();
    const newAppointment = new appointmentModel({
      ...data,
      timestamp: timeNow,
      updatedAt: timeNow,
    });
    await newAppointment.save();
    return newAppointment;
  } catch (error) {
    console.error("Error creating appointment:", error);
    return error;
  }
};

export const getAppointments = async (fromDate, toDate) => {
  try {
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    const records = await appointmentModel.find({
      date: {
        $gte: fromDateObj,
        $lte: toDateObj,
      },
    });
    return records;
  } catch (error) {
    console.error("Error fetching appointments from db:", error);
    throw error;
  }
};
