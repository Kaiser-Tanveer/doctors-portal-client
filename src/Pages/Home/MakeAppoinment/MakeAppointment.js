import React from 'react';
import appointment from '../../../assets/images/appointment.png';
import doctor from '../../../assets/images/doctor.png';
import PrimaryBtn from '../../../Components/BtnComponent/PrimaryBtn';

const MakeAppointment = () => {
    return (
        <div className="hero mt-52 text-white" style={{ background: `url(${appointment})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div className="hero-content flex-col lg:flex-row">
                <img src={doctor} alt="doctorImg" className='lg:w-1/2 -mt-32 hidden lg:block' />
                <div>
                    <h1 className="text-xl font-bold text-primary">Appointment</h1>
                    <h1 className="text-4xl font-bold py-5">Make an appointment Today</h1>
                    <p className="mb-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <PrimaryBtn>GET STARTED</PrimaryBtn>
                </div>
            </div>
        </div>
    );
};

export default MakeAppointment;