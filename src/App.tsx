import {useState, useEffect} from 'react';
import { DateTime } from 'luxon';

const categoriaMapToDisplay = {
  femicidio:                     "Femicidio",
  intento_femicidio:             "Intento de Femicidio",
  transfemicidio:                "Transfemicidio",
  femicidio_vinculado:           "Femicidio Vinculado",
  intento_femicidio_vinculado:   "Intento de Femicidio Vinculado",
  investiga_femicidio:           "Se Investiga - Femicidio",
  investiga_femicidio_vinculado: "Se Investiga - Femicidio Vinculado",
  investiga_transfemicidio:      "Se Investiga - Transfemicidio",
};

const fetchCases = () => {
    return fetch("http://localhost:8080/v1/cases")
      .then((response) => response.json())
};

const Nav = () => {
  return (
    <nav className="navbar bg-body-tertiary navbar-expand-lg" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Registro de Femicidios</a>
      </div>
    </nav>
  );
}

const Table = ({elements})=>{
  return (
      <div className="container-fluid">
        <table className="table">
          <thead>
            <tr>
              <th scope='col'>Categoría</th>
              <th scope='col'>Víctima</th>
              <th scope='col'>Agresor</th>
              <th scope='col'>Ubicación</th>
              <th scope='col'>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {elements.map((el)=>(
              <tr key={el.id}>
              <td>{categoriaMapToDisplay[el.categoria]}</td>
              <td>{el.nombre_victima}</td>
              <td>{el.nombre_agresor}</td>
              <td>{el.ubicacion}</td>
              <td>{DateTime.fromISO(el.fecha).setLocale("es").toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}

function App() {
  const [ data, setData ] = useState([]);
  useEffect(() => {
    fetchCases().then((data) => setData(data));
  });
  return (
    <>
      <Nav />
      <Table elements={data} />
    </>
  )
}

export default App
