import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Checkout from './Checkout/Checkout';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET);

const Payment = () => {
    const booking = useLoaderData();
    const { price, treatment, appointmentDate, email, phone } = booking;
    return (
        <div>
            <h2 className='text-3xl font-semibold'>Payment</h2>
            <p className='text-xl'>Please, Pay <strong>৳{price}</strong> for <strong>{treatment}</strong> on <strong>{appointmentDate}</strong></p>

            <p>We'll call you if anything change at {phone} <br /> Or, send email to {email}</p>
            <div className='w-96'>
                <Elements stripe={stripePromise}>
                    <Checkout
                        booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;