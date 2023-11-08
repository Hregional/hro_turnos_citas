import {
  createTurnService,
  getTurnsOfTheDayService,
  updateTurnStatusService,
  getTurnsReportService,
  buildTurnsReportCsvFileContent,
  updateTurnClicinService,
} from "../services/turns";

export const createTurnController = async (req, res) => {
  try {
    const response = await createTurnService(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      message:
        "An error occurred while generating creating the turn in the core service",
    });
  }
};

export const getTurnsOfTheDayController = async (_req, res) => {
  try {
    const { data, status } = await getTurnsOfTheDayService();
    res.status(status).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "An error occurred while retrieving the turns of the day from the core service",
    });
  }
};

export const updateTurnStatusController = async (req, res) => {
  try {
    const { data, status } = await updateTurnStatusService(req.body);
    console.log("updateTurnStatusController ===>", data, status);
    res.status(status).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "An error occurred while updating the turn status to the core service",
    });
  }
};

export const updateTurnClinicController = async (req, res) => {
  try {
    const { data, status } = await updateTurnClicinService(req.body);
    res.status(status).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "An error occurred while updating the turn clinic to the core service",
    });
  }
};

export const getTurnsReportController = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;
    if (!fromDate || !toDate) {
      return res.status(400).json({ message: "invalid params" });
    }
    const response = await getTurnsReportService(fromDate, toDate);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the turns report",
    });
  }
};

export const getTurnsReportCsvController = async (req, res) => {
  const { fromDate, toDate } = req.query;
  if (!fromDate || !toDate) {
    return res.status(400).json({ message: "invalid params" });
  }
  const turns = await getTurnsReportService(fromDate, toDate);
  const csvContent = buildTurnsReportCsvFileContent(turns);
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", `attachment; filename=turnos-hro.csv`);
  res.send(csvContent);
};
