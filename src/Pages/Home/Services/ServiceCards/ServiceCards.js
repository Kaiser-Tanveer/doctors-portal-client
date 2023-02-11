import React from 'react';
import cavity from '../../../../assets/images/cavity.png';
import fluoride from '../../../../assets/images/fluoride.png';
import whitening from '../../../../assets/images/whitening.png';
import ServiceCard from './ServiceCard';

const ServiceCards = () => {

    const serviceData = [
        {
            id: 1,
            title: 'Fluoride Treatment',
            description: 'We offers a healthy treatment in a cheap price.',
            icon: cavity,
        },
        {
            id: 2,
            title: 'Cavity Filling',
            description: 'We offers a healthy treatment in a cheap price.',
            icon: fluoride,
        },
        {
            id: 1,
            title: 'Teeth Whitening',
            description: 'We offers a healthy treatment in a cheap price.',
            icon: whitening,
        },
    ]
    return (
        <div className=' mt-32'>
            <h4 className='text-primary text-xl font-bold text-center'>OUR SERVICES</h4>
            <h2 className='text-4xl text-center pb-16'>Services We Provide</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    serviceData.map(singleService => <ServiceCard
                        key={singleService.id}
                        singleService={singleService}
                    />)
                }
            </div>
        </div>
    );
};

export default ServiceCards;