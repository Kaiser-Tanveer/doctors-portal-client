import React from 'react';
import clock from '../../../assets/icons/clock.svg';
import marker from '../../../assets/icons/marker.svg';
import phone from '../../../assets/icons/phone.svg';
import InfoCard from './InfoCard';

const InfoCards = () => {
    const cardData = [
        {
            id: 1,
            title: 'Opening Hours',
            description: 'Opens from 10: 00 am to 04: 00 pm Everyday',
            icon: clock,
            bgColor: 'bg-gradient-to-r from-primary to-secondary',
        },
        {
            id: 2,
            title: 'Visit Us',
            description: 'Brooklyn, NY 10036, United States',
            icon: marker,
            bgColor: 'bg-accent',
        },
        {
            id: 3,
            title: 'Contact Us',
            description: '+000 123 456789',
            icon: phone,
            bgColor: 'bg-gradient-to-r from-secondary to-primary',
        },
    ]
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
                cardData.map(SingleData => <InfoCard
                    key={SingleData.id}
                    SingleData={SingleData}
                />)
            }
        </div>
    );
};

export default InfoCards;