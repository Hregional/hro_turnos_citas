import express from "express";
const router = express.Router();
import {
  createTurnController,
  getTurnsOfTheDayController,
  updateTurnStatusController,
  getTurnsReportController,
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
export const getTurnsReportRoute = router.get(
  "/turns/report/",
  getTurnsReportController
);
