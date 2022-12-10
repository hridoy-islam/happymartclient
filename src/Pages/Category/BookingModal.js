import { useContext } from "react";
import { userContext } from "../../Contexts/AuthContext";
import toast from 'react-hot-toast'


const BookingModal = ({ product, setProduct, refetch }) => {
    const { user } = useContext(userContext)
    const { _id, productname, resaleprice } = product;

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const productname = form.productname.value;
        const resaleprice = form.resaleprice.value;
        const phonenumber = form.phonenumber.value;
        const meetinglocation = form.meetinglocation.value;
        const sellername = form.sellername.value;
        const selleremail = form.selleremail.value;
        const booking = {
            productid: _id,
            productname,
            resaleprice,
            phonenumber,
            meetinglocation,
            sellername,
            selleremail
        }

        fetch(`${process.env.REACT_APP_API_URL}/bookings`, {
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
                    setProduct(null);
                    toast.success('Booking confirmed');
                    refetch();
                }
                else {
                    toast.error(data.message);
                }
            })


    }

    return (
        <>
            <input type="checkbox" id="book-now" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <form onSubmit={handleBooking}>
                        <label htmlFor="book-now" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <label>Product Name </label>
                        <input type="text" name='productname' defaultValue={productname} disabled className="input w-full input-bordered " />
                        <label>Asking Price</label>
                        <input type="text" name='resaleprice' defaultValue={resaleprice} disabled className="input w-full input-bordered " />
                        <label>Phone Number</label>
                        <input type="text" name="phonenumber" placeholder="phone number" className="input w-full input-bordered " />
                        <label>Meeting Location</label>
                        <input type="text" name="meetinglocation" placeholder="meeting location" className="input w-full input-bordered " />
                        <label>Seller Name</label>
                        <input name="sellername" type="text" defaultValue={user.displayName} disabled placeholder="Your Name" className="input w-full input-bordered" />
                        <label>Seller Email</label>
                        <input name="selleremail" type="email" defaultValue={user.email} disabled placeholder="Email Address" className="input w-full input-bordered" />
                        <br />
                        <input className='btn btn-accent w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;