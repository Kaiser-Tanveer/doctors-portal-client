import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../../../Shared/ConfirmationModal/ConfirmationModal';
import Loader from '../../../Shared/Loader/Loader';

const ManageDoctor = () => {
    const [deleteDoctor, setDeleteDoctor] = useState(null);

    const cancelModal = () => {
        setDeleteDoctor(null);
    }

    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                // console.log(data);
                return data;
            }
            catch (error) {

            }
        }
    });

    const deleteAction = doctor => {
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${doctor.name} deleted successfully!`);
                }
                console.log(data);
            })
    }

    if (isLoading) {
        return <Loader />
    }
    return (
        <div>
            <h2 className="text-3xl font-semibold py-10">Manage Doctor: {doctors.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, i) => <tr
                                key={doctor._id}
                            >
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={doctor.image} alt="doctorImg" />
                                        </div>
                                    </div>
                                </td>
                                <td className='font-semibold'>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialty}</td>
                                <td>
                                    <label onClick={() => setDeleteDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-xs btn-error">DELETE</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deleteDoctor &&
                <ConfirmationModal
                    title={'Are you sure you want to delete?'}
                    message={`If you delete ${deleteDoctor.name}. It ca't be undone!`}
                    deleteAction={deleteAction}
                    doctorData={deleteDoctor}
                    cancelModal={cancelModal}
                />
            }
        </div>
    );
};

export default ManageDoctor;