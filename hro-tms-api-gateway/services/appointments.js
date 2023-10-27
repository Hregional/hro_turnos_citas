import axios from "axios";
import { SERVICES } from "../utils/services";
import {
  GOOGLE_CALENDAR_HEADERS,
  OUTLOOK_CALENDAR_HEADERS,
} from "../utils/constants";
import { formatDate } from "../utils/helpers";

export const createAppointmentService = async (data) => {
  try {
    const response = await axios.post(
      SERVICES.appointments.createAppointments,
      data
    );
    return { data: response.data };
  } catch (error) {
    return error;
  }
};

export const getAppointmentsService = async (fromDate, toDate) => {
  try {
    const response = await axios.get(
      `${SERVICES.appointments.getAppointments}?fromDate=${fromDate}&toDate=${toDate}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const buildAppointmentsGoogleCsvFileContent = (appointments) => {
  const headers = GOOGLE_CALENDAR_HEADERS.join(",") + "\r\n";
  const rows = appointments
    .map((app) =>
      [
        app.subject,
        formatDate(app.date, "YYYY-MM-DD"),
        app.startTime,
        formatDate(app.date, "YYYY-MM-DD"),
        app.endTime,
        "False",
        app.description,
        app.location,
      ].join(",")
    )
    .join("\r\n");
  return headers + rows;
};

export const buildAppointmentsOutlookCsvFileContent = (appointments) => {
  console.log(appointments);
  const headers = OUTLOOK_CALENDAR_HEADERS.join(",") + "\r\n";
  const rows = appointments
    .map((app) =>
      [
        app.subject,
        app.location,
        app.startTime,
        formatDate(app.date, "MM/DD/YYYY"),
        app.endTime,
        formatDate(app.date, "MM/DD/YYYY"),
        "False",
        "False",
        "",
        "",
        "",
        "False",
        "Normal",
        app.description,
      ].join(",")
    )
    .join("\r\n");

  return headers + rows;
};
