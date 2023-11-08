import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material/";
import { useSelector, useDispatch } from "react-redux";
import {
  setTurnDialogFormOpen,
  setFullScreenDialogOpen,
} from "@redux/reducers/admin";
import { updateSelectedClinic, createTurn } from "@redux/reducers/turns";

const TurnDialogForm = ({ patient = null, turn = null }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const area = user?.area;
  const areaName = area.name || "";
  const clinics = area.area_clinics || [];
  const subject = `${patient?.nombres || ""} ${patient?.apellidos || ""} - ${
    patient?.noHistoriaClinica
  }`;

  const { turnDialogFormOpen } = useSelector((state) => state.admin);
  const { selectedClinic } = useSelector((state) => state.turns);

  const formHasErrors = !selectedClinic;

  const handleClose = () => {
    dispatch(setTurnDialogFormOpen(false));
  };

  const handleChangeClinic = ({ target: value }) => {
    dispatch(updateSelectedClinic(value.value));
  };

  const handleSaveTurn = () => {
    const method = turn ? "PUT" : "POST";
    const { name: selectedClinicName } = clinics.find(
      (clinic) => clinic.number === selectedClinic
    );
    dispatch(
      createTurn({
        payload: {
          ...patient,
          areaName,
          areaId: area.id,
          clinicId: selectedClinic,
          clinicName: selectedClinicName,
        },
        token,
        method,
      })
    );
    dispatch(setTurnDialogFormOpen(false));
    dispatch(setFullScreenDialogOpen({ open: false, location: "" }));
  };

  return (
    <div>
      <Dialog open={turnDialogFormOpen} onClose={handleClose} fullWidth>
        <DialogTitle>Crear turno</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              margin="dense"
              label="Paciente"
              type="text"
              fullWidth
              variant="outlined"
              value={subject}
              disabled
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              margin="dense"
              label="Area"
              type="text"
              fullWidth
              variant="outlined"
              value={areaName}
              disabled
              sx={{ marginTop: 2 }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: 2 }} error={!selectedClinic}>
            <InputLabel>Clinica</InputLabel>
            <Select
              value={selectedClinic}
              label="Clinica"
              onChange={handleChangeClinic}
            >
              {clinics.map((clinic, key) => (
                <MenuItem key={key} value={clinic.number}>{`${clinic.number} ${
                  clinic.name ? "-" : ""
                } ${clinic.name}`}</MenuItem>
              ))}
            </Select>
            {!selectedClinic && (
              <Typography variant="caption" sx={{ marginTop: 1 }} color="error">
                Selecciona la clinica
              </Typography>
            )}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSaveTurn} disabled={formHasErrors}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TurnDialogForm;
