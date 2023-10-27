import express from "express";
const router = express.Router();
import { searchPatientController } from "../controllers/patients";

export const searchPatientRoute = router.post(
  "/patients/",
  searchPatientController
);
