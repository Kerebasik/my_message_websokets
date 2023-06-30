import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import SignUp from '../components/pages/SignUp';
import LogIn from '../components/pages/LogIn';
import { ResetPassword } from '../components/pages/ResetPassword';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<LogIn />} />
    </>
  )
);

export default router;
