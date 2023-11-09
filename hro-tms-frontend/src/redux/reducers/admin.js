import { createSlice } from "@reduxjs/toolkit";
import { TURN_STATUS } from "@utils/constants";

const initialState = {
  currentIndex: 0,
  filterParameter: TURN_STATUS.onQueue,
  fullScreenDialogOpen: false,
  fullScreenDialogOpenAt: "",
  appointmentDialogFormOpen: false,
  turnDialogFormOpen: false,
  turnsTableColumns: {
    "# Turno": true,
    "Historia Clinica": true,
    "Nombre completo": true,
    Clinica: true,
    Genero: true,
    Padre: false,
    Madre: false,
    Responsable: true,
    Acciones: true,
  },
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setIndex: (state, { payload: { index } }) => {
      state.currentIndex = index;
    },
    setFilterParameter: (state, { payload }) => {
      state.filterParameter = payload;
    },
    setFullScreenDialogOpen: (state, { payload: { open, location } }) => {
      state.fullScreenDialogOpen = open;
      state.fullScreenDialogOpenAt = location;
    },
    setAppointmentDialogFormOpen: (state, { payload }) => {
      state.appointmentDialogFormOpen = payload;
    },
    setTurnDialogFormOpen: (state, { payload }) => {
      state.turnDialogFormOpen = payload;
    },
    setTurnsTableColumnVisibility: (
      state,
      { payload: { column, visibility } }
    ) => {
      state.turnsTableColumns[column] = visibility;
    },
    showDefaultTableColumns: (state) => {
      state.turnsTableColumns = initialState.turnsTableColumns;
    },
  },
});

export const {
  setIndex,
  setFilterParameter,
  setFullScreenDialogOpen,
  setAppointmentDialogFormOpen,
  setTurnDialogFormOpen,
  setTurnsTableColumnVisibility,
  showDefaultTableColumns,
} = adminSlice.actions;
export default adminSlice.reducer;
