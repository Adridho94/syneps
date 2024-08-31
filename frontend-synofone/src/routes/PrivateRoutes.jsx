import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({Children}) => {
    const token = Cookies.get('token');

    if (!token)
    {
        return <Navigate to='/' replace />
    }

    return Children;
}

export default PrivateRoutes;