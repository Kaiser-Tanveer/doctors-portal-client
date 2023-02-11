import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext/AuthProvider';

const ErrorPage = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const error = useRouteError();

    const signOutHandler = () => {
        logOut()
            .then(() => {
                navigate('/logIn');
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div>
            <p className='text-3xl text-error text-center'>Oops!!</p>
            <p className='text-2xl text-error text-center'>Something went wrong...</p>
            <p className='text-xl text-center'>{error.statusText || error.message}</p>
            <h4 className='text-center'>Please, <button className='mt-4 mt-lg-0 btn btn-xs btn-outline' onClick={signOutHandler} variant='outline-primary' size='sm'>Log Out</button> and login again</h4>
        </div>
    );
};

export default ErrorPage;