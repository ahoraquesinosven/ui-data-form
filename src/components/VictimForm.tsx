import { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Container,
  Typography,
} from "@mui/material";

const VictimForm = ({ formValues, handleInputChange }) => {
  //const [formValues, setFormValues] = useState({
    //victim_name_lastname: "",
    //victim_age: "",
    //victim_nationality: "",
    //victim_prostitution: false,
    //victim_missing: false,
    //victim_native_people: false,
    //victim_pregnant: false,
    //victim_disabillity: false,
    //victim_ocupation: "",
    //victim_children: false,
    //victim_creation: "",
    //victim_last_update: "",
  //});

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Informacion de la Victima
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre y Apellido"
              name="victim_name_lastname"
              value={formValues.victim_name_lastname}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Edad"
              name="victim_age"
              type="number"
              value={formValues.victim_age}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nacionalidad (3 Letras)"
              name="victim_nationality"
              value={formValues.victim_nationality}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ocupacion"
              name="victim_ocupation"
              value={formValues.victim_ocupation}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="Prostitucion"
                  checked={formValues.victim_prostitution}
                  onChange={handleInputChange}
                />
              }
              label="Prostitution"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="Desaparecida"
                  checked={formValues.victim_missing}
                  onChange={handleInputChange}
                />
              }
              label="Desaparecida"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="Pueblo Originario"
                  checked={formValues.victim_native_people}
                  onChange={handleInputChange}
                />
              }
              label="Pueblo Originario"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="Embarazada"
                  checked={formValues.victim_pregnant}
                  onChange={handleInputChange}
                />
              }
              label="Embarazada"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="Discapacidad"
                  checked={formValues.victim_disabillity}
                  onChange={handleInputChange}
                />
              }
              label="Discapacidad"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="Hijos"
                  checked={formValues.victim_children}
                  onChange={handleInputChange}
                />
              }
              label="Hijos"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="victim_creation"
              name="victim_creation"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formValues.victim_creation}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="victim_last_update"
              name="victim_last_update"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formValues.victim_last_update}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

        </Grid>
      </form>
    </Container>
  );
};

export default VictimForm;
