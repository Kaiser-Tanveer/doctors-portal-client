import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext/AuthProvider';
import useAdmin from '../../CustomHooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, adminLoading] = useAdmin(user?.email);
    const location = useLocation();

    if (loading || adminLoading) {
        return <div className='flex mx-auto items-center justify-center'>
            <button className="btn loading">loading</button>
        </div>;
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='/logIn' state={{ from: location }} replace />
};

export default AdminRoute;