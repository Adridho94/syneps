import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
    const token = Cookies.get('token');
    const role = Cookies.get('role');
    if (!token && role !== '1')
    {
        return <Navigate to='/' replace />
    }

    return children;
}

export default PrivateRoutes;