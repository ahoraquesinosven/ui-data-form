import { useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Button, Grid, Container, Typography } from '@mui/material';

const AggressorForm = ( { formValues, handleInputChange } ) => {
//  const [formValues, setFormValues] = useState({
//    aggresor_gender: '',
//   aggresor_name_lastname: '',
//    aggresor_age: '',
//    aggresor_legal_complaint_history: false,
//    aggresor_cases_history: false,
//    aggresor_captive_history: false,
//    aggresor_behaviour_post_case: false,
//    aggresor_creation: '',
//    aggresor_last_update: '',
//  });

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
      Informacion de Victimario
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Genero"
              name="aggresor_gender"
              value={formValues.aggresor_gender}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre y Apellido"
              name="aggresor_name_lastname"
              value={formValues.aggresor_name_lastname}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Edad"
              name="aggresor_age"
              type="number"
              value={formValues.aggresor_age}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="aggresor_legal_complaint_history"
                  checked={formValues.aggresor_legal_complaint_history}
                  onChange={handleInputChange}
                />
              }
              label="aggresor_legal_complaint_history"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="aggresor_cases_history"
                  checked={formValues.aggresor_cases_history}
                  onChange={handleInputChange}
                />
              }
              label="aggresor_cases_history"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="aggresor_captive_history"
                  checked={formValues.aggresor_captive_history}
                  onChange={handleInputChange}
                />
              }
              label="aggresor_captive_history"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="aggresor_behaviour_post_case"
                  checked={formValues.aggresor_behaviour_post_case}
                  onChange={handleInputChange}
                />
              }
              label="aggresor_behaviour_post_case"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="aggresor_creation"
              name="aggresor_creation"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formValues.aggresor_creation}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="aggresor_last_update"
              name="aggresor_last_update"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formValues.aggresor_last_update}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

        </Grid>
      </form>
    </Container>
  );
};

export default AggressorForm;
