import React, { useState } from 'react';
import chair from '../../../assets/images/chair.png';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvailableAppointment from '../AvailableAppointment/AvailableAppointment';

const Appointment = () => {
    // Lift up state 
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <div className='my-52' style={{ backgroundImage: `linear-gradient(to bottom, #ffffff 50%, rgba(0, 0, 0, 0)), url(${chair})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <AppointmentBanner
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
            <AvailableAppointment
                selectedDate={selectedDate}
            />
        </div>
    );
};

export default Appointment;