import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className='flex mx-auto items-center justify-center'>
            <button className="btn loading">loading</button>
        </div>;
    }
    if (user) {
        return children;
    }
    return <Navigate to='/logIn' state={{ from: location }} replace />
};

export default PrivateRoute;