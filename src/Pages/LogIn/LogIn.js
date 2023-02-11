import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext/AuthProvider';
import useToken from '../../CustomHooks/useToken';

const LogIn = () => {
    const { signIn, GoogleLogIn } = useContext(AuthContext);
    const [formError, setFormError] = useState('');
    const [loginEmail, setLoginEmail] = useState('');

    const location = useLocation();
    const [token] = useToken(loginEmail);
    const navigate = useNavigate();

    const from = location?.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const { register, formState: { errors }, handleSubmit } = useForm('');

    const submitHandler = data => {
        console.log(data);
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginEmail(user.email);
            })
            .catch(err => {
                console.error(err.message);
                setFormError(err.message);
            })
    }

    return (
        <div className='justify-center items-center mx-auto text-center w-96 p-8 shadow'>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="form-control w-full">
                    <h2 className='text-4xl font-semibold'>Login</h2>
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register("email", { required: 'Email Address required' })} placeholder="Your email" className="input input-bordered w-full" />
                    {errors.email && <p className='text-error' role="alert">{errors.email?.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" {...register("password", { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters of long' } })} placeholder="Your Password" className="input input-bordered w-full" />
                    {errors.password && <p className='text-error' role="alert">{errors.password?.message}</p>}
                </div>
                <input type="submit" className='w-full btn btn-accent mt-8 font-bold' />
                <p className='text-error'>{formError}</p>
                <p>New to doctors portal?<Link className='text-secondary mt-3' to='/signUp'>Create new account</Link></p>
                <div className='divider'>OR</div>
                <button onClick={() => GoogleLogIn()
                    .then(result => {
                        const user = result.user;
                        console.log(user);
                        navigate(from, { replace: true });
                        toast.success('Signed in Successfully!')
                    })
                    .then(err => console.error(err))
                } className='btn btn-accent btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </form>
        </div >
    );
};

export default LogIn;