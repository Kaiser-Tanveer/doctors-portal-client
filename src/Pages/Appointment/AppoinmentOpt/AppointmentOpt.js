import React from 'react';

const AppointmentOpt = ({ appointOpt, setTreatment }) => {
    const { name, slots, price } = appointOpt;
    // console.log(appointOpt);
    return (
        <div className="card shadow-xl py-10">
            <div className="card-body">
                <h2 className="text-2xl text-secondary text-center font-bold">{name}</h2>
                <p className='text-center'>{slots?.length > 0 ? slots[0] : 'Try another day!!'}</p>
                <p className='text-center'>{slots?.length} {slots?.length === 0 || slots?.length === 1 ? 'Sit is' : 'Sits are'} available</p>
                <p className='text-center'>Price: ৳{price}</p>
                <div className="card-actions justify-center">
                    <label
                        disabled={slots.length === 0}
                        onClick={() => setTreatment(appointOpt)}
                        htmlFor="booking-modal" className="btn btn-secondary text-white font-bold">
                        Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOpt;