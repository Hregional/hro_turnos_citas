import express from "express";
const router = express.Router();
import {
  createAppointmentController,
  getAppointmentsController,
  getAppointmentsCsvController,
} from "../controllers/appointments";

export const createAppointmentRoute = router.post(
  "/appointments",
  createAppointmentController
);

export const getAppointmentsRoute = router.get(
  "/appointments",
  getAppointmentsController
);

export const getAppointmentsCsvRoute = router.get(
  "/appointments/csv",
  getAppointmentsCsvController
);
