import {
  createAppointment,
  getAppointments,
} from "../services/appointmentsService";

export const createAppointmentController = async (req, res) => {
  try {
    const newAppointment = await createAppointment(req.body);
    res.status(201).json({
      message: "Appointment created successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

export const getAppointmentsController = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;
    const appointments = await getAppointments(fromDate, toDate);
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
