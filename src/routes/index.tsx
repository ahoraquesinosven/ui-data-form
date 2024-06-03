import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Landing} from './Landing';
import {Feed} from './Feed';
import {AuthorizationCallback} from '@/hooks/auth';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/oauth/cb' element={<AuthorizationCallback />} />
        <Route path='/' element={<Landing />}>
          <Route path='/feed' element={<Feed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
