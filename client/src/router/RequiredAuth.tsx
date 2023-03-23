import { toast } from "react-toastify";
import { useAppSelector } from "../app/store/configureStore";




interface Props {
    roles?: string[];
}

export default function RequiredAuth({ roles }: Props) {

    return (
        <h1>Authorization required !!!!</h1>
    )
    // const { user } = useAppSelector(state => state.account);
    // //const location = useLocation();

    // // if (!user) {
    // //     return <Navigate to='/login' state={{from:location}} /> 
    // // }
    
    // if (roles && !roles.some(r => user.roles?.includes(r))) {
    //     toast.error('Not authorised to acces this area!');
    //     //return <Navigate to='/catalog' /> 
    // }

    // return <Outlet /> 
}