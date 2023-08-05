import {FC, PropsWithChildren} from "react";
import {useAuth} from "../hooks/useAuth";
import {Navigate} from "react-router-dom";


const PrivateRoute:FC<PropsWithChildren> = ({children})=>{
    const {auth} = useAuth()


    if(auth){
        return (
            <>{children}</>
        )
    }

    return(<Navigate to={'/login'}/>)

}

export default PrivateRoute