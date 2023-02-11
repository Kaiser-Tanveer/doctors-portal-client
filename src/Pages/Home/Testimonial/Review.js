import React from 'react';

const Review = ({ review }) => {
    const { description, user, name, location } = review;
    return (
        <div className="card shadow-xl">
            <div className="card-body">
                <p>{description}</p>
            </div>
            <div className='flex items-center pl-6 py-6'>
                <div className="avatar">
                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user} alt='' />
                    </div>
                </div>
                <div className='ml-6'>
                    <h4>{name}</h4>
                    <p>{location}</p>
                </div>
            </div>
        </div>
    );
};

export default Review;