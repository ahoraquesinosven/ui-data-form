import { Outlet } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="navbar bg-body-tertiary navbar-expand-lg" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Registro de Femicidios</a>
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

