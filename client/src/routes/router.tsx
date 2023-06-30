import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import SignUp from '../components/pages/SignUp';
import LogIn from '../components/pages/LogIn';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<div>/</div>} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<LogIn />} />
    </>
  )
);

export default router;
