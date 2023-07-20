import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import SignUp from '../components/pages/SignUp';
import LogIn from '../components/pages/LogIn';
import { ResetPassword } from '../components/pages/ResetPassword';
import { Verified } from '../components/pages/Verified';
import ChatLayout from "../components/layouts/ChatLayout";
import ChatOutlet from "../components/parts/ChatOutlet";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
        <Route path='/' element={<ChatLayout/>}>
            <Route path={':id'} element={<ChatOutlet/>}/>
        </Route>
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<LogIn />} />
      <Route path='/verified' element={<Verified />} />
    </>
  )
);

export default router;
