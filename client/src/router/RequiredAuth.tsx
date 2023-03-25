import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/store/configureStore";


interface Props {
    roles?: string[];
}

export default function RequiredAuth({ roles }: Props) {
    const { user } = useAppSelector(state => state.account);
    const location = useLocation();

    if (!user) {
        return <Navigate to='/login' state={ {from: location }} /> 
    }

    return <Outlet /> 
    
  


}