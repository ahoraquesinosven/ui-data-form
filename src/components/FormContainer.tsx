import { useState } from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import VictimForm from "./VictimForm";
import AggressorForm from "./AggressorForm";
import CaseForm from "./CaseForm";
import { Button } from '@mui/material';

const FormContainer = () => {
    const [victimFormValues, setVictimFormValues] = useState({});
    const [aggressorFormValues, setAggressorFormValues] = useState({});
    const [caseFormValues, setCaseFormValues] = useState({});
  
    const handleVictimForm = (e: any) => {
        const { name, value } = e.target;
          setVictimFormValues({
            ...victimFormValues,
            [name]: value,
          });
    };

    const handleAggressorForm = (e: any) => {
        const { name, value} = e.target;
          setAggressorFormValues({
              ...aggressorFormValues,
              [name]: value,
          });
    }

    const handleCaseForm = (e: any) => {
        const { name, value} = e.target;
          setCaseFormValues({
              ...caseFormValues,
              [name]: value,
          });
    }


    const handleSubmit = (e : any) =>{
      e.preventDefault();
    }

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4} direction="column" alignItems="stretch">
          <Grid item>
            <VictimForm formValues={victimFormValues} handleInputChange={setVictimFormValues}/>
          </Grid>
          <Grid item>
            <AggressorForm formValues={aggressorFormValues} handleInputChange={setAggressorFormValues}/>
          </Grid>
          <Grid item>
            <CaseForm formValues={caseFormValues} handleInputChange={handleCaseForm}/>
          </Grid>
          <Grid item>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Enviar
              </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default FormContainer;
