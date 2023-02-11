import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext/AuthProvider';
import useToken from '../../CustomHooks/useToken';

const SignUp = () => {
    const { createUser, updateUser, GoogleLogIn } = useContext(AuthContext);
    const [formError, setFormError] = useState('');
    const [createUserEmail, setCreateUserEmail] = useState('');

    const location = useLocation();
    const [token] = useToken(createUserEmail);
    const navigate = useNavigate();

    const from = location?.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const { register, formState: { errors }, handleSubmit } = useForm('');

    const submitHandler = data => {
        setFormError('');
        console.log(data);
        createUser(data?.email, data?.password)
            .then(result => {
                const user = result?.user;
                console.log(user);
                toast.success('User created successfully!');
                const userInfo = {
                    displayName: data?.name
                }
                saveUser(data?.name, data?.email);
                updateUser(userInfo)
                    .then(result => {
                        const user = result?.user;
                        console.log(user);
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => {
                console.error(err);
                setFormError(err.message);
            });
    }

    // // Saving User 
    const saveUser = (name, email) => {
        const user = { name, email };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user),
        })
            .then(res => res.json())
            .then(data => {
                console.log('saved user', data);
                setCreateUserEmail(email);
            })
    }

    return (
        <div className='justify-center items-center mx-auto text-center w-96 p-8 shadow'>
            <form onSubmit={handleSubmit(submitHandler)}>
                <h2 className='text-4xl font-semibold'>SignUp</h2>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" {...register("name", { required: 'Name is required' })} placeholder="Your Name" className="input input-bordered w-full" />
                    {errors.name && <p className='text-error'>{errors.name.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register("email", { required: 'Email is required' })} placeholder="Your email" className="input input-bordered w-full" />
                    {errors.email && <p className='text-error'>{errors.email.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" {...register("password", {
                        required: 'Password is required',
                        pattern: { value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9])(?=.*[!,@#$%^&*?_~])/, message: 'Password must contain Capital, small & Special Character' },
                        minLength: { value: 6, message: 'Password must be 6 characters or long' }
                    })} placeholder="Your Password" className="input input-bordered w-full" />
                    {errors.password && <p className='text-error'>{errors.password.message}</p>}
                </div>
                <input type="submit" className='w-full btn btn-accent mt-8 font-bold' />
                <p className='text-error'>{formError}</p>
                <p>Already have an account? Please, <Link className='text-secondary mt-3' to='/logIn'>Login</Link></p>
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

export default SignUp;