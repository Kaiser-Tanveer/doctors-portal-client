import React from 'react';
import Banner from '../Banner/Banner';
import chair from '../../../assets/images/chair.png';
import InfoCards from '../InfoCards/InfoCards';
import ServiceCards from '../Services/ServiceCards/ServiceCards';
import Treatment from '../Services/Treatment/Treatment';
import MakeAppointment from '../MakeAppoinment/MakeAppointment';
import Testimonial from '../Testimonial/Testimonial';

const Home = () => {
    return (
        <div className='max-w-[1398px] mx-auto m-5'>
            <Banner />
            <div style={{ backgroundImage: `linear-gradient(to bottom, #ffffff 50%, rgba(0, 0, 0, 0)), url(${chair})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <InfoCards />
            </div>
            <ServiceCards />
            <Treatment />
            <MakeAppointment />
            <Testimonial />
        </div>
    );
};

export default Home;