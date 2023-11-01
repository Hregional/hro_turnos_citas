import axios from "axios";
import { buildQueryStrinParams } from "../utils/helpers";
import { SERVICES } from "../utils/services";

const MAX_PATIENTS_LENGTH_ALLOWED = 1000;
const HTTP_STATUS_CODE_CONTENT_TOO_LARGE = 413;

const limitPatientsLength = (status, data) => {
  if (status !== 200) {
    return {
      status,
    };
  }
  if (status === 200 && data.length > MAX_PATIENTS_LENGTH_ALLOWED) {
    return {
      status: HTTP_STATUS_CODE_CONTENT_TOO_LARGE,
    };
  }
  return {
    status,
    data,
  };
};

export const searchPatientsByClinicalHistoryService = async (
  clinicalHistory
) => {
  try {
    const { status, data } = await axios.get(
      `${SERVICES.patients.searchPatientsByClinicHistory}${clinicalHistory}`
    );
    return limitPatientsLength(status, data);
  } catch (error) {
    return {
      status: error.response.status,
    };
  }
};

export const searchPatientsByNamesService = async (params) => {
  try {
    const requestUrl = `${
      SERVICES.patients.searchPatientsByNames
    }${buildQueryStrinParams(params)}`;
    const { status, data } = await axios.get(requestUrl);
    return limitPatientsLength(status, data);
  } catch (error) {}
};
