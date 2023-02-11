import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Loader from '../../../Shared/Loader/Loader';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm('');
    const imageHostKey = process.env.REACT_APP_IMGBB;
    // console.log(imageHostKey);
    // Loading data using react use query 
    const { data: specialties, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointmentSpecialty')
            const data = await res.json();
            // console.log(data);
            return data;
        }
    })
    const addDocHandler = data => {
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {

                    // Doctor's Data Object
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        image: imgData.data.url,
                        specialty: data.specialty
                    };
                    console.log(doctor);

                    // Posting doctor object 
                    fetch('http://localhost:5000/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor),
                    })
                        .then(res => res.json)
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.name} is added successfully!`);
                        })
                }
            })
    }

    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='my-10'>
            <div className='justify-center items-center mx-auto text-center w-96 p-8 shadow'>
                <form onSubmit={handleSubmit(addDocHandler)}>
                    <h2 className='text-4xl font-semibold'>Add a Doctor</h2>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", { required: 'Name is required' })} placeholder="Doctor's Name" className="input input-bordered w-full" />
                        {errors.name && <p className='text-error'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", { required: 'Email is required' })} placeholder="email" className="input input-bordered w-full" />
                        {errors.email && <p className='text-error'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input type="file" {...register("img", { required: 'Photo is required' })} placeholder="UPload Photo" className="input input-bordered w-full" />
                        {errors.img && <p className='text-error'>{errors.img.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Specialty</span>
                        </label>
                        <select
                            {...register("specialty")}
                            className="select select-bordered w-full max-w-xs">
                            {
                                specialties.map(specialty => <option
                                    key={specialty._id}
                                    value={specialty.name}
                                >{specialty.name}</option>)
                            }
                        </select>
                    </div>
                    <input type="submit" value="Add Doctor" className='w-full btn btn-accent mt-8 font-bold' />
                </form>
            </div >
        </div>
    );
};

export default AddDoctor;