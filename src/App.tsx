function getCasesFromServer() {
  return [
    {
      id: 1,
      categoria: "Femicidio",
      nombre_victima: "Agustina",
      nombre_agresor: "Leandro",
      ubicacion: "Santa Fe",
      fecha: "2023-04-23T15:00:00.000Z"
    },
    {
      id: 2,
      categoria: "Intento de femicidio",
      nombre_victima: "Nicole",
      nombre_agresor: "Jeremias",
      ubicacion: "Formosa",
      fecha: "2022-11-11T16:23:45.000Z"
    },
    {
      id: 3,
      categoria: "Se investiga - Femicidio",
      nombre_victima: "Victoria",
      nombre_agresor: "Nicolas",
      ubicacion: "Tierra del fuego",
      fecha: "2020-09-23T23:30:30.000Z"
    },
    {
      id: 4,
      categoria: "Transfemicidio",
      nombre_victima: "Naiara",
      nombre_agresor: "Jose Luis",
      ubicacion: "Mendoza",
      fecha: "2024-01-23T23:30:30.000Z"
    },
    {
      id: 5,
      categoria: "Intento de Femicidio Vinculado",
      nombre_victima: "Camila",
      nombre_agresor: "Jorge",
      ubicacion: "Buenos Aires",
      fecha: "2017-06-11T23:30:30.000Z"
    },
  ]
}



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
              <td>{el.categoria}</td>
              <td>{el.nombre_victima}</td>
              <td>{el.nombre_agresor}</td>
              <td>{el.ubicacion}</td>
              <td>{el.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
