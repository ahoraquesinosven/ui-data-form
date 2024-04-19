import Nav from './Nav';
import ListContainer from './ListContainer';
import FormContainer from './FormContainer';

function App() {

  return (
    <>
      <Nav />
      <button type="button" class="btn btn-lg fw-bold w-10 align-self-end mb-3 mt-3 text-light rounded-4" style={{ backgroundColor: "#FF00FF" }}> Cargar </button>
      <ListContainer />
      {/* <FormContainer/> */}
    </>
  )
}

export default App
