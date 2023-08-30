import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import SignUp from '../components/pages/SignUp';
import LogIn from '../components/pages/LogIn';
import { ResetPassword } from '../components/pages/ResetPassword';
import { Verified } from '../components/pages/Verified';
import ChatLayout from '../components/layouts/ChatLayout';
import ChatOutlet from '../components/parts/ChatOutlet';
import PrivateRoute from '../hoc/PrivateRoute';
import { PrivateRoutes, PublicRoutes } from '../constants/routes';
import { CreateChannel } from '../components/pages/CreateChannel';
import { CreateGroup } from '../components/pages/CreateGroup';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={PrivateRoutes.ROOT}
        element={
          <PrivateRoute>
            <ChatLayout />
          </PrivateRoute>
        }
      >
        <Route
          path={PrivateRoutes.CREATE_CHANNEL}
          element={<CreateChannel />}
        />
        <Route
          path={PrivateRoutes.CREATE_GROUP}
          element={<CreateGroup />}
        ></Route>
        <Route path={PrivateRoutes.CHAT_OUTLET} element={<ChatOutlet />} />
      </Route>
      <Route path={PublicRoutes.RESET_PASSWORD} element={<ResetPassword />} />
      <Route path={PublicRoutes.SIGNUP} element={<SignUp />} />
      <Route path={PublicRoutes.LOGIN} element={<LogIn />} />
      <Route path={PublicRoutes.VERIFIED} element={<Verified />} />
      <Route path={PublicRoutes.NOT_FOUND} element={<div>404</div>} />
    </>
  )
);

export default router;
