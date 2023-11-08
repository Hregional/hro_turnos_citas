import * as React from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ButtonGroup,
  Button,
  Divider,
} from "@mui/material";
import {
  People,
  HowToReg,
  CallMissedOutgoing,
  PersonOff,
  Edit as EditIcon,
} from "@mui/icons-material";
import { updateTurnStatus, setSelectedTurn } from "@redux/reducers/turns";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Speech from "@molecules/Speech";

import { setTurnDialogFormOpen } from "@redux/reducers/admin";

import { StyledTableCell, StyledTableRow } from "@utils/styles";
import { TURN_STATUS } from "@utils/constants";

export default function TurnActionMenu({ turn, index }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (_e, newStatus) => {
    setAnchorEl(null);
    if (
      [
        TURN_STATUS.onQueue,
        TURN_STATUS.attended,
        TURN_STATUS.absent,
        TURN_STATUS.cancelled,
      ].includes(newStatus)
    ) {
      dispatch(
        updateTurnStatus({ payload: { id: turn._id, newStatus }, token })
      );
    }
  };

  const handleOpenEditDialog = (turn) => {
    dispatch(setSelectedTurn(turn));
    dispatch(setTurnDialogFormOpen(true));
  };

  return (
    <React.Fragment>
      <StyledTableRow
        key={`${turn.codigo}-StyledTableRow-Key-${index}`}
        sx={{
          "&:hover": {
            backgroundColor: "lightblue",
          },
        }}
      >
        <StyledTableCell
          onClick={handleClick}
          component="th"
          scope="row"
          sx={{
            fontSize: "1.5rem !important",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          {turn.numero}
        </StyledTableCell>
        <StyledTableCell
          onClick={handleClick}
          component="th"
          scope="row"
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          {turn.noHistoriaClinica}
        </StyledTableCell>
        <StyledTableCell
          onClick={handleClick}
          component="th"
          scope="row"
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          {`${turn.nombres} ${turn.apellidos}`}
        </StyledTableCell>
        <StyledTableCell
          onClick={handleClick}
          align="left"
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          {turn.sexo}
        </StyledTableCell>
        <StyledTableCell
          onClick={handleClick}
          align="left"
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          {turn.nombrePadre}
        </StyledTableCell>
        <StyledTableCell
          onClick={handleClick}
          align="left"
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          {turn.nombreMadre}
        </StyledTableCell>
        <StyledTableCell
          onClick={handleClick}
          align="left"
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          {turn.nombre_Resposable}
        </StyledTableCell>
        <StyledTableCell align="left">
          <ButtonGroup variant="outlined" aria-label="text button group">
            {turn.status === TURN_STATUS.onQueue && (
              <Speech
                text={`Turno ${turn.numero}, ${turn.nombres} ${turn.apellidos}`}
              />
            )}
            {turn.status !== TURN_STATUS.onQueue && (
              <Button
                color="primary"
                onClick={(e) => handleClose(e, TURN_STATUS.onQueue)}
              >
                En cola
                <People />
              </Button>
            )}
            {turn.status !== TURN_STATUS.attended && (
              <Button
                color="success"
                onClick={(e) => handleClose(e, TURN_STATUS.attended)}
              >
                Atendido
                <HowToReg />
              </Button>
            )}
            {turn.status !== TURN_STATUS.absent && (
              <Button
                color="warning"
                onClick={(e) => handleClose(e, TURN_STATUS.absent)}
              >
                Ausente
                <CallMissedOutgoing />
              </Button>
            )}
          </ButtonGroup>
        </StyledTableCell>
      </StyledTableRow>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "center" }}
      >
        <MenuItem onClick={() => handleOpenEditDialog(turn)}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          Editar
        </MenuItem>
        <Divider />
        {turn.status !== TURN_STATUS.cancelled && (
          <MenuItem onClick={(e) => handleClose(e, TURN_STATUS.cancelled)}>
            <ListItemIcon>
              <PersonOff />
            </ListItemIcon>
            Anular
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
}
