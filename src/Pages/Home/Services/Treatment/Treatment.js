import React from 'react';
import treatment from '../../../../assets/images/treatment.png';

const Treatment = () => {
    return (
        <div className="hero pt-32">
            <div className="hero-content flex-col lg:flex-row">
                <img src={treatment} alt='treatmentPhoto' className='w-full lg:max-w-[458px] rounded' />
                <div className='lg:m-24'>
                    <h1 className="text-6xl font-bold">Exceptional Dental Care, on Your Terms</h1>
                    <p className="py-6">Out treatment is very unique and little bit expensive. So any people are not able to get it. For them we have a fund facility from abroad.</p>
                </div>
            </div>
        </div>
    );
};

export default Treatment;