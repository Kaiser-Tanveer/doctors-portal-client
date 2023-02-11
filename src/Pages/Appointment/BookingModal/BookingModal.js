import { format } from 'date-fns';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthContext/AuthProvider';

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
    const { user } = useContext(AuthContext);
    const { name: treatmentName, slots, price } = treatment;
    //(treatment is the another name of appointment option)
    const date = format(selectedDate, 'PP');

    const bookingHandler = e => {
        e.preventDefault();
        const form = e.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const booking = {
            appointmentDate: date,
            patient: name,
            treatment: treatmentName,
            slot,
            email,
            phone,
            price
        }

        // Sending Booking data to backend
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success('Booking Confirmed');
                    refetch()
                }
                else {
                    toast.error(data.message);
                }
            })

    }
    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{treatmentName}</h3>
                    <form onSubmit={bookingHandler}>
                        <input name='selectedSlot' type="text" defaultValue={date} className="input input-bordered w-full my-3" disabled />
                        <select name='slot' className="select select-bordered w-full my-3">
                            {
                                slots?.map((slot, i) => <option
                                    key={i}
                                    value={slot}>{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" defaultValue={user?.displayName} disabled className="input input-bordered w-full my-3" />
                        <input name='email' type="email" defaultValue={user?.email} className="input input-bordered w-full my-3" disabled />
                        <input name='phone' type="number" placeholder="Your Phone" className="input input-bordered w-full my-3" />
                        <input htmlFor='booking-modal' type="submit" value='Submit' className="btn btn-accent w-full" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;