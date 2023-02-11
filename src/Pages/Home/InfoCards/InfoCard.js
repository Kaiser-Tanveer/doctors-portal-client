import React from 'react';

const InfoCard = ({ SingleData }) => {
    const { icon, title, description, bgColor } = SingleData;
    return (
        <div className={`card card-side shadow-xl lg:mt-60 p-6 block lg:flex text-white ${bgColor}`}>
            <figure><img src={icon} alt="infoIcon" className='w-1/2 lg:w-full' /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default InfoCard;