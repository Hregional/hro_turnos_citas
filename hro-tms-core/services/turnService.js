import turnModel from "../models/turnModel";
import { TURN_STATUS } from "../utils/constants";

export const createTurn = async (data) => {
  try {
    const newTurn = new turnModel({
      ...data,
      timestamp: new Date().toISOString(),
      status: TURN_STATUS.onQueue,
      numero: (await getTurnsOfTheDayCount()) + 1,
    });
    await newTurn.save();
    return newTurn;
  } catch (error) {
    return error;
  }
};

export const getOneDayRangeTime = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return { today, tomorrow };
};

export const getTurnsOfTheDay = async () => {
  try {
    const { today, tomorrow } = await getOneDayRangeTime();
    const turns = await turnModel.find({
      timestamp: { $gte: today, $lt: tomorrow },
    });
    return turns;
  } catch (error) {
    return error;
  }
};

export const getTurnsOfTheDayCount = async () => {
  try {
    const { today, tomorrow } = await getOneDayRangeTime();
    const turnsCount = await turnModel.count({
      timestamp: { $gte: today, $lt: tomorrow },
    });
    return turnsCount;
  } catch (error) {
    return error;
  }
};

export const updateTurnStatus = async (id, newStatus) => {
  try {
    const updatedTurn = await turnModel.findByIdAndUpdate(
      id,
      { status: newStatus, updatedAt: new Date().toISOString() },
      {
        new: true,
      }
    );
    if (!updatedTurn) {
      throw new Error("User not found or couldn't be updated");
    }
    return updatedTurn;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

export const getTurnsReport = async (fromDate, toDate) => {
  try {
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    const records = await turnModel.find({
      timestamp: {
        $gte: fromDateObj,
        $lte: toDateObj,
      },
    });
    return records;
  } catch (error) {
    console.error("Error fetching turns report from db:", error);
    throw error;
  }
};
