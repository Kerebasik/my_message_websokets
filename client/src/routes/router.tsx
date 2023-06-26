import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import SignUp from "../components/pages/SignUp";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route  path='/signup' element={<SignUp/>}/>
            <Route path="/" element={<div>router</div>} />
        </>
    )
);

export default router