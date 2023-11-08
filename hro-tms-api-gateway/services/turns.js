import axios from "axios";
import { SERVICES } from "../utils/services";
import { TURNS_REPORT_HEADERS } from "../utils/constants";

export const createTurnService = async (data) => {
  try {
    const response = await axios.post(SERVICES.turns.createTurn, data);
    return { data: response.data };
  } catch (error) {
    return error;
  }
};

export const getTurnsOfTheDayService = async () => {
  try {
    const response = await axios.get(SERVICES.turns.getTurnsOfTheDay);
    return { data: response.data, status: response.status };
  } catch (error) {
    return { data: error, status: 500 };
  }
};

export const updateTurnStatusService = async (payload) => {
  try {
    const response = await axios.put(SERVICES.turns.updateTurn, payload);
    return { data: response.data, status: response.status };
  } catch (error) {
    return { data: error, status: 500 };
  }
};

export const updateTurnClicinService = async (payload) => {
  try {
    const response = await axios.put(SERVICES.turns.updateTurnClinic, payload);
    return { data: response.data, status: response.status };
  } catch (error) {
    return { data: error, status: 500 };
  }
};

export const getTurnsReportService = async (fromDate, toDate) => {
  try {
    const response = await axios.get(
      `${SERVICES.turns.getTurnsReport}?fromDate=${fromDate}&toDate=${toDate}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const buildTurnsReportCsvFileContent = (turns) => {
  const headers = TURNS_REPORT_HEADERS.join(",") + "\r\n";
  const rows = turns
    .map((turn) =>
      [
        turn._id,
        turn.noHistoriaClinica,
        turn.nombres,
        turn.apellidos,
        turn.sexo,
        turn.timestamp,
        turn.status,
        turn.areaName,
        turn.numero,
        turn.updatedAt,
      ].join(",")
    )
    .join("\r\n");
  return headers + rows;
};
