import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import Loader from '../../../Shared/Loader/Loader';
import AppointmentOpt from '../AppoinmentOpt/AppointmentOpt';
import BookingModal from '../BookingModal/BookingModal';

const AvailableAppointment = ({ selectedDate }) => {
    const [treatment, setTreatment] = useState(null);
    const date = format(selectedDate, 'PP');

    const { data: appointOpts = [], refetch, isLoading } = useQuery({
        queryKey: ['appointOpts', date],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/appointOpts?date=${date}`);
            const data = await res.json();
            return data;

        }
    })

    // Loader 
    if (isLoading) {
        return <Loader />
    }

    return (
        <div className='bg-white py-40'>
            <p className='text-center text-secondary text-xl font-bold py-10'>You picked: {format(selectedDate, 'PP')}</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    appointOpts.map(appointOpt => <AppointmentOpt
                        key={appointOpt._id}
                        appointOpt={appointOpt}
                        setTreatment={setTreatment}
                    />)
                }
            </div>
            {
                treatment &&
                <BookingModal
                    selectedDate={selectedDate}
                    treatment={treatment}
                    setTreatment={setTreatment}
                    refetch={refetch}
                />
            }
        </div>
    );
};

export default AvailableAppointment;