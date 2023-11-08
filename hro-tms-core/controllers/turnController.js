import {
  createTurn,
  getTurnsOfTheDay,
  updateTurnStatus,
  getTurnsReport,
  updateTurnClinic,
} from "../services/turnService";

export const createTurnController = async (req, res) => {
  try {
    const newTurn = await createTurn(req.body);
    res
      .status(201)
      .json({ message: "Turn created successfully", turn: newTurn });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

export const getTurnsOfTheDayController = async (_req, res) => {
  try {
    const turnQueue = await getTurnsOfTheDay();
    res.status(200).json(turnQueue);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

export const updateTurnStatusController = async (req, res) => {
  try {
    const { newStatus, id } = req.body;
    const updatedTurn = await updateTurnStatus(id, newStatus);
    res.status(200).json(updatedTurn);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating turn status",
      error: error.message,
    });
  }
};

export const updateTurnClinicController = async (req, res) => {
  try {
    const { clinicId, clinicName, _id } = req.body;
    const updatedTurn = await updateTurnClinic({ clinicId, clinicName, _id });
    res.status(200).json(updatedTurn);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating turn clinic",
      error: error.message,
    });
  }
};

export const getTurnsReportController = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;
    const turns = await getTurnsReport(fromDate, toDate);
    res.status(200).json(turns);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};