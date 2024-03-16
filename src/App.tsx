import { DateTime } from 'luxon';

function getCasesFromServer() {
  return [
    {
      id: 1,
      categoria: "femicidio",
      nombre_victima: "Agustina",
      nombre_agresor: "Leandro",
      ubicacion: "Santa Fe",
      fecha: "2023-04-23T15:00:00.000Z"
    },
    {
      id: 2,
      categoria: "intento_femicidio",
      nombre_victima: "Nicole",
      nombre_agresor: "Jeremias",
      ubicacion: "Formosa",
      fecha: "2022-11-11T16:23:45.000Z"
    },
    {
      id: 3,
      categoria: "investiga_femicidio",
      nombre_victima: "Victoria",
      nombre_agresor: "Nicolas",
      ubicacion: "Tierra del fuego",
      fecha: "2020-09-23T23:30:30.000Z"
    },
    {
      id: 4,
      categoria: "transfemicidio",
      nombre_victima: "Naiara",
      nombre_agresor: "Jose Luis",
      ubicacion: "Mendoza",
      fecha: "2024-01-23T23:30:30.000Z"
    },
    {
      id: 5,
      categoria: "intento_femicidio_vinculado",
      nombre_victima: "Camila",
      nombre_agresor: "Jorge",
      ubicacion: "Buenos Aires",
      fecha: "2017-06-11T23:30:30.000Z"
    },
  ]
}

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


function App() {
  return (
    <>
      <nav className="navbar bg-body-tertiary navbar-expand-lg" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Registro de Femicidios</a>
        </div>
      </nav>
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
            {getCasesFromServer().map((el)=>(
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
    </>
  )
}

export default App
