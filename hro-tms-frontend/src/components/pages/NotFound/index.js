import React from "react";
import { Typography, Button, Box, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { SentimentVeryDissatisfied as ErrorIcon } from "@mui/icons-material";

const NotFound = () => {
  return (
    <Container maxWidth="sm">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Box textAlign="center">
          <ErrorIcon style={{ fontSize: 80, color: "#FF6B6B" }} />
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Error 404
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Página no encontrada
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            ¡Ups! Parece que has tomado un camino equivocado. La página que
            buscas no existe.
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Volver a la Página Principal
          </Button>
        </Box>
      </Grid>
    </Container>
  );
};

export default NotFound;
