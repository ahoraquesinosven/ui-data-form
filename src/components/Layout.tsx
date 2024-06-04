import {Outlet} from 'react-router-dom';
import {useQuery} from 'react-query';
import { UserAvatar } from '@/components/UserAvatar';
import {useAccessToken, RequiresAuthorization} from '@/hooks/auth';
import {fetchCurrentUser} from '@/api/aqsnv/profiles';

const UserPic = () => {
  const token = useAccessToken();
  const {data} = useQuery({
    queryKey: ["me"],
    queryFn: () => fetchCurrentUser(token),
  });


  if (data) {
    return (
      <div className="navbar-nav dflex">
        <UserAvatar user={data} />
      </div>
    );
  } else {
    return (
      <></>
    );
  }
};

const Nav = () => {
  return (
    <nav className="navbar bg-primary navbar-expand-lg" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Registro de Femicidios</a>
        <UserPic />
      </div>
    </nav>
  );
}

export const Layout = () => {
  return (
    <RequiresAuthorization>
      <Nav />
      <Outlet />
    </RequiresAuthorization>
  );
};

