import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Landing} from './Landing';
import {AuthorizationCallback} from '@/hooks/auth';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/app' element={<Landing />} />
        <Route path='/oauth/cb' element={<AuthorizationCallback />} />
      </Routes>
    </BrowserRouter>
  );
}
