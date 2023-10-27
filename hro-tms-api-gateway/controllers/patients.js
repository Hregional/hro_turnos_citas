import express from "express";

import {
  searchPatientsByClinicalHistoryService,
  searchPatientsByNamesService,
} from "../services/patients";

export const searchPatientController = async (req, res) => {
  try {
    const { searchBy } = req.body;
    if (searchBy === "clinicalHistory") {
      const response = await searchPatientsByClinicalHistoryService(
        req.body.clinicalHistory
      );
      res.status(response.status).json(response);
      return;
    }
    if (searchBy === "names") {
      const response = await searchPatientsByNamesService(req.body.queryParams);
      res.status(response.status).json(response);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "An error occurred while searching patient from Patients Service",
    });
  }
};
