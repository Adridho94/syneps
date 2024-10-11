import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const token = Cookies.get('token');
    const role = Cookies.get('role');

    // Pengecekan apakah token ada
    if (!token) {
        return <Navigate to='/' replace />;
    }

    // Pengecekan jika role === '1' (admin), arahkan ke /admin/dashboard
    // if (role === '1') {
    //     return <Navigate to='/admin/dashboard' replace />;
    // }

    // Pengecekan role selain admin yang tidak diizinkan
    if (role !== '1') {
        return <Navigate to='/' replace />;
    }

    // Jika token dan role valid, render komponen anak (children)
    return children;
};

export default PrivateRoutes;
