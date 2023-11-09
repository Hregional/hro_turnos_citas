import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Alert,
  Snackbar,
  TextField,
  Button,
  Menu,
  Fade,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import OpenInNew from "@mui/icons-material/OpenInNew";
import { useEffect, useState } from "react";
import {
  getTurns,
  setSnackbarFailedTurnShow,
  setSnackbarSuccessTurnShow,
  setSnackbarFailedTurnUpdateShow,
  setSnackbarSuccessTurnUpdateShow,
} from "@redux/reducers/turns";
import {
  setTurnsTableColumnVisibility,
  showDefaultTableColumns,
} from "@redux/reducers/admin";
import { APP_URLS } from "@routes";
import { TURN_STATUS } from "@utils/constants";
import { sortByProperty as sortArray, addSearchFields } from "@utils/helpers";

import { StyledTableCell, StyledTableRow } from "@utils/styles";

import TurnActionMenu from "./TurnActionMenu";
import TurnsBottomNavigation from "./TurnsBottomNavigation";
import {
  PersonSearch as PersonSearchIcon,
  ViewColumn as ViewColumnIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import TurnDialogForm from "./TurnsDialogForm";

const TurnsQueue = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getTurns(token));
  }, [dispatch, token]);

  const {
    fetchingTurnsStatus,
    turnQueue,
    snackbarFailedTurnShow,
    snackbarSuccessTurnShow,
    creatingTurnStatus,
    snackbarFailedTurnUpdateShow,
    snackbarSuccessTurnUpdateShow,
  } = useSelector((state) => state.turns);

  const { filterParameter, turnsTableColumns } = useSelector(
    (state) => state.admin
  );

  const [filterValue, setFilterValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value.toLowerCase());
  };

  const handleCloseSnackbarSuccess = () =>
    dispatch(setSnackbarSuccessTurnShow(false));

  const handleCloseSnackbarError = () =>
    dispatch(setSnackbarFailedTurnShow(false));

  const handleCloseSnackbarUpdateTurnSuccess = () => {
    dispatch(setSnackbarSuccessTurnUpdateShow(false));
  };

  const handleCloseSnackbarUpdateTurnError = () =>
    dispatch(setSnackbarFailedTurnUpdateShow(false));

  const buildTableHeader = () => {
    return Object.keys(turnsTableColumns).map((column, index) => (
      <StyledTableCell
        align="left"
        key={`StyledTableCellKeyCell-${index}`}
        sx={{
          display: turnsTableColumns[column] ? "table-cell" : "none !important",
        }}
      >
        {column}
      </StyledTableCell>
    ));
  };

  if (turnQueue.length === 0 && fetchingTurnsStatus === "succeeded") {
    return (
      <Alert
        severity="warning"
        sx={{
          margin: "0 auto",
          width: "30rem",
          marginTop: "3rem",
          justifyContent: "center",
        }}
      >
        No se han generado turnos para el dia de hoy
      </Alert>
    );
  }

  if (fetchingTurnsStatus === "failed") {
    return (
      <Alert
        variant="filled"
        severity="error"
        sx={{ margin: "0 auto", width: "30rem", marginTop: "3rem" }}
      >
        Error al cargar los turnos del dia, intente de nuevo
      </Alert>
    );
  }

  if (fetchingTurnsStatus === "loading") {
    return (
      <Box
        sx={{
          width: "75%",
          margin: "0 auto",
          textAlign: "center",
          marginTop: "3rem",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
          CARGANDO TURNOS DEL DIA
        </Typography>
        <LinearProgress color="warning" />
      </Box>
    );
  }

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseColumnsMenu = () => {
    setAnchorEl(null);
  };

  const renderSeachTurns = () => {
    const filteredTurns = arrayToRender.filter((turn) =>
      turn.searchField.includes(filterValue)
    );
    return filteredTurns.map((turn, index) => (
      <TurnActionMenu
        turn={turn}
        index={index}
        key={"TurnActionMenuKey" + index}
      />
    ));
  };

  const processedTurnQueue = addSearchFields(turnQueue);

  const patientsOnQueue = processedTurnQueue.filter(
    (turn) => turn.status === TURN_STATUS.onQueue
  );

  const patientsAttended = sortArray(
    processedTurnQueue.filter((turn) => turn.status === TURN_STATUS.attended),
    "updatedAt",
    "desc"
  );

  const patientsAbsent = sortArray(
    processedTurnQueue.filter((turn) => turn.status === TURN_STATUS.absent),
    "updatedAt",
    "desc"
  );

  const patientsCancelled = sortArray(
    processedTurnQueue.filter((turn) => turn.status === TURN_STATUS.cancelled),
    "updatedAt",
    "desc"
  );

  const TURNS_MAP = {};
  TURNS_MAP[TURN_STATUS.onQueue] = patientsOnQueue;
  TURNS_MAP[TURN_STATUS.attended] = patientsAttended;
  TURNS_MAP[TURN_STATUS.absent] = patientsAbsent;
  TURNS_MAP[TURN_STATUS.cancelled] = patientsCancelled;

  const arrayToRender = TURNS_MAP[filterParameter];

  return (
    <Card variant="outlined" sx={{ marginTop: 0.3 }}>
      <CardContent sx={{ padding: "0!important" }}>
        <Box
          sx={{
            "& .MuiTextField-root": { marginBottom: 1, width: "100%" },
            textAlign: "left",
          }}
          noValidate
          autoComplete="off"
        >
          {creatingTurnStatus === "loading" && (
            <Snackbar open={true} message="Creando turno" />
          )}
          <Snackbar
            open={snackbarSuccessTurnShow}
            autoHideDuration={6000}
            onClose={handleCloseSnackbarSuccess}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbarSuccess}
              severity="success"
              sx={{ width: "100%" }}
              variant="filled"
            >
              Turno creado correctamente
            </Alert>
          </Snackbar>
          <Snackbar
            open={snackbarFailedTurnShow}
            autoHideDuration={6000}
            onClose={handleCloseSnackbarError}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbarError}
              severity="error"
              sx={{ width: "100%" }}
              variant="filled"
            >
              Error al crear el turno, intente de nuevo
            </Alert>
          </Snackbar>
          <Snackbar
            open={snackbarSuccessTurnUpdateShow}
            autoHideDuration={4000}
            onClose={handleCloseSnackbarUpdateTurnSuccess}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbarUpdateTurnSuccess}
              severity="success"
              sx={{ width: "100%" }}
              variant="filled"
            >
              Turno actualizado correctamente
            </Alert>
          </Snackbar>
          <Snackbar
            open={snackbarFailedTurnUpdateShow}
            autoHideDuration={4000}
            onClose={handleCloseSnackbarUpdateTurnError}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbarUpdateTurnError}
              severity="error"
              sx={{ width: "100%" }}
              variant="filled"
            >
              No se pudo actualizar el turno, intente de nuevo
            </Alert>
          </Snackbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem",
              paddingBottom: "0",
              paddingTop: "0.25rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                minWidth: "20rem",
                marginTop: 1,
              }}
            >
              <PersonSearchIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <TextField
                id="input-with-sx"
                label={`Buscar turno ${filterParameter}`}
                variant="standard"
                onChange={handleFilterValueChange}
              />
            </Box>
            <Typography variant="subtitle2">
              <Link
                href={APP_URLS.queue}
                underline="hover"
                target="_blank"
                rel="noopener"
              >
                Mostrar sala de espera <OpenInNew />
              </Link>
            </Typography>
          </Box>
          <Box sx={{}} display="flex" justifyContent="flex-end" marginRight={2}>
            <Button
              variant="outlined"
              size="small"
              endIcon={<KeyboardArrowDownIcon />}
              startIcon={<ViewColumnIcon />}
              onClick={handleClick}
            >
              Columnas
            </Button>{" "}
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseColumnsMenu}
              TransitionComponent={Fade}
            >
              <FormGroup sx={{ paddingLeft: 2 }}>
                {Object.entries(turnsTableColumns).map((column, key) => (
                  <FormControlLabel
                    key={key}
                    control={<Switch checked={column[1]} />}
                    label={column[0]}
                    onClick={() =>
                      dispatch(
                        setTurnsTableColumnVisibility({
                          column: column[0],
                          visibility: !column[1],
                        })
                      )
                    }
                  />
                ))}
                <Button
                  variant="text"
                  size="small"
                  onClick={() => {
                    dispatch(showDefaultTableColumns());
                    handleCloseColumnsMenu();
                  }}
                >
                  Restablecer
                </Button>
              </FormGroup>
            </Menu>
          </Box>
          <TurnsBottomNavigation
            onQueueCount={patientsOnQueue.length}
            attendedCount={patientsAttended.length}
            absentCount={patientsAbsent.length}
            cancelledCount={patientsCancelled.length}
          />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>{buildTableHeader()}</TableRow>
              </TableHead>
              <TableBody>
                {arrayToRender.length === 0 && (
                  <StyledTableRow key="No-data-in-table-key">
                    <StyledTableCell>
                      <Alert sx={{ width: "100%" }} severity="info">
                        No hay turnos en estado {filterParameter}
                      </Alert>
                    </StyledTableCell>
                  </StyledTableRow>
                )}
                {!filterValue &&
                  arrayToRender.map((turn, index) => (
                    <TurnActionMenu
                      turn={turn}
                      index={index}
                      key={"TurnActionMenuKey" + index}
                    />
                  ))}
                {filterValue && renderSeachTurns()}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </CardContent>
      <TurnDialogForm />
    </Card>
  );
};

export default TurnsQueue;
