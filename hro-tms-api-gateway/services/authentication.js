import axios from "axios";
import { SERVICES } from "../utils/services";

export const getAccessTokenService = async (username, password) => {
  try {
    // Make a request to the authentication microservice
    const response = await axios.post(SERVICES.authentication.getAccessToken, {
      username,
      password,
    });
    // Return the token to the controller
    return { token: response.data.access };
  } catch (error) {
    return error;
  }
};

export const getAreas = async () => {
  try {
    const { status, data } = await axios.get(SERVICES.authentication.getAreas);
    return { status, data };
  } catch (error) {
    return {
      status: error.response.status,
    };
  }
};

export const verifyAccessTokenService = async (token) => {
  try {
    const response = await axios.post(
      SERVICES.authentication.verifyAccessToken,
      {
        token,
      }
    );
    return { status: response?.status || 500, data: response?.data || null };
  } catch (error) {
    return {
      status: error?.response?.status || 500,
    };
  }
};
