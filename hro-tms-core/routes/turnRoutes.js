import express from "express";
const router = express.Router();
import {
  createTurnController,
  getTurnsOfTheDayController,
  updateTurnStatusController,
  getTurnsReportController,
  updateTurnClinicController,
} from "../controllers/turnController";

export const createTurnRoute = router.post("/turns", createTurnController);
export const getTurnsOfTheDayRoute = router.get(
  "/turns/today",
  getTurnsOfTheDayController
);
export const updateTurnStatusRoute = router.put(
  "/turns",
  updateTurnStatusController
);
export const updateTurnClinicRoute = router.put(
  "/turns/clinic",
  updateTurnClinicController
);
export const getTurnsReportRoute = router.get(
  "/turns/report/",
  getTurnsReportController
);
