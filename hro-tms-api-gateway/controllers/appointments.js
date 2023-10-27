import {
  createAppointmentService,
  getAppointmentsService,
  buildAppointmentsGoogleCsvFileContent,
  buildAppointmentsOutlookCsvFileContent,
} from "../services/appointments";

export const createAppointmentController = async (req, res) => {
  try {
    const response = await createAppointmentService(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      message:
        "An error occurred while generating creating the appointment in the core service",
    });
  }
};

export const getAppointmentsController = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;
    if (!fromDate || !toDate) {
      return res.status(400).json({ message: "invalid params" });
    }
    const response = await getAppointmentsService(fromDate, toDate);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the appointments",
    });
  }
};

export const getAppointmentsCsvController = async (req, res) => {
  const { fromDate, toDate, targetCalendar } = req.query;
  if (!fromDate || !toDate || !targetCalendar) {
    return res.status(400).json({ message: "invalid params" });
  }
  const appointments = await getAppointmentsService(fromDate, toDate);
  let csvContent;
  if (targetCalendar === "google") {
    csvContent = buildAppointmentsGoogleCsvFileContent(appointments);
  }
  if (targetCalendar === "outlook") {
    csvContent = buildAppointmentsOutlookCsvFileContent(appointments);
  }
  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=citas-${targetCalendar}.csv`
  );
  res.send(csvContent);
};
