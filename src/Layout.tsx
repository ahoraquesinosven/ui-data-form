import { Outlet, Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="navbar bg-body-tertiary navbar-expand-lg" data-bs-theme="dark">
      <div className="collapse navbar-collapse">
        <Link className="navbar-brand" href="/">Registro de Femicidios</Link>
        <ul class="navbar-nav">
          <li class="nav-item active">
            <Link class="nav-link" to="/">Inicio</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/form">Form</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/cases">Casos</Link>
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

