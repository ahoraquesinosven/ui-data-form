import { Outlet, Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="navbar bg-body-tertiary navbar-expand-lg" data-bs-theme="dark">
      <div className="collapse navbar-collapse">
        <Link className="navbar-brand" href="/">Registro de Femicidios</Link>
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Inicio</Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Casos
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/form">Agregar Caso</Link>
              <Link className="dropdown-item" to="/cases">Ver Listado</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default Layout;

