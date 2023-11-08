import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { decodeJwt } from "@utils/helpers";
import { fetchingResourceStatuses } from "@utils/constants";
import { ENDPOINTS } from "@routes";

const { auth } = ENDPOINTS;

const initialState = {
  token: "",
  tokenStatus: fetchingResourceStatuses,
  sessionExpired: false,
  username: "",
  password: "",
  user: null,
  showErrorSnackbar: false,
  snackbarErrorText: "Credenciales invalidas, intente de nuevo",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateInput: (state, { payload: { field, value } }) => {
      state[field] = value;
    },
    logout: (state) => ({
      ...state,
      ...initialState,
    }),
    setShowErrorSnackbar: (state, { payload }) => {
      state.showErrorSnackbar = payload;
    },
    resetAuthState: (state) => {
      state.token = initialState.token;
      state.tokenStatus = initialState.tokenStatus;
      state.sessionExpired = initialState.sessionExpired;
      state.username = initialState.username;
      state.password = initialState.password;
      state.user = initialState.user;
      state.showErrorSnackbar = initialState.showErrorSnackbar;
      state.snackbarErrorText = initialState.snackbarErrorText;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAccessToken.pending, (state) => {
        state.tokenStatus = "loading";
        state.token = "";
      })
      .addCase(
        getAccessToken.fulfilled,
        (state, { payload: { token, status } }) => {
          if (status === 200 && token) {
            const jwtData = decodeJwt(token);
            const user = jwtData?.user;
            if (!user.area) {
              state.tokenStatus = "failed";
              state.sessionExpired = true;
              state.showErrorSnackbar = true;
              state.snackbarErrorText = "El usuario no está asignado a un área";
              return;
            }
            state.tokenStatus = "succeeded";
            state.token = token;
            state.sessionExpired = false;
            state.username = "";
            state.password = "";
            state.user = user;
            return;
          }
          state.tokenStatus = "failed";
          state.token = "";
          state.showErrorSnackbar = true;
          state.snackbarErrorText = initialState.snackbarErrorText;
        }
      )
      .addCase(getAccessToken.rejected, (state) => {
        state.tokenStatus = "failed";
        state.token = "";
        state.showErrorSnackbar = true;
        state.snackbarErrorText = initialState.snackbarErrorText;
      });
  },
});

export const { updateInput, logout, setShowErrorSnackbar, resetAuthState } =
  authSlice.actions;
export default authSlice.reducer;

export const getAccessToken = createAsyncThunk(
  "auth/getAccessToken",
  async (payload) => {
    try {
      const {
        data: { token, status: statusFromData },
        status: statusFromResponse,
      } = await axios.post(auth.getAuthenticationToken, payload);
      return { token, status: statusFromData || statusFromResponse || 400 };
    } catch (error) {
      return { error: error, status: error.status || 500 };
    }
  }
);
