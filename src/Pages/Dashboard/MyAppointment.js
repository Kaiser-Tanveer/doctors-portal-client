import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext/AuthProvider';

const MyAppointment = () => {
    const { user } = useContext(AuthContext);

    const url = `http://localhost:5000/bookings?email=${user?.email}`;
    const { data: bookings = [], } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })



    return (
        <div className="overflow-x-auto">
            <h3 className='text-3xl font-semibold pb-5'>My Appointment</h3>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Treatment</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings?.map((booking, index) =>
                            <tr
                                key={booking._id}
                                className='hover'
                            >
                                <th>{index + 1}</th>
                                <td>{booking.patient}</td>
                                <td>{booking.treatment}</td>
                                <td>{booking.appointmentDate}</td>
                                <td>{booking.slot}</td>
                                <td>
                                    {
                                        booking.price && !booking.paid &&
                                        <Link to={`/dashboard/payment/${booking._id}`}>
                                            <button className='btn btn-primary btn-sm'>PAY</button>
                                        </Link>
                                    }
                                    {
                                        booking.price && booking.paid &&
                                        <span className='text-primary font-semibold'>PAID</span>
                                    }
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyAppointment;