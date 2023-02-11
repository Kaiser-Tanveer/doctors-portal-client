import React from 'react';
import { DayPicker } from 'react-day-picker';
import chair from '../../../assets/images/chair.png';

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {

    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className="rounded-lg w-full lg:w-1/2 shadow-2xl" alt='' />
                <div className='p-6 card bg-white shadow'>
                    <DayPicker
                        mode='single'
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                    />
                </div>
            </div>
        </div>
    );
};

export default AppointmentBanner;