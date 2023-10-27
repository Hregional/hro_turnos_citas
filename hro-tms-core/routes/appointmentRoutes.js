import express from "express";
const router = express.Router();
import {
  createAppointmentController,
  getAppointmentsController,
} from "../controllers/appointmentsController";

export const createAppointmentRoute = router.post(
  "/appointments",
  createAppointmentController
);
export const getAppointmentsRoute = router.get(
  "/appointments",
  getAppointmentsController
);
