import { React } from "react";


const Booking = ({ booking, onEdit, onDelete }) => {

  return (
    <div className="mt-9 p-3 py-10 border border-gray-300 rounded-md shadow-md">
      <p>
        <strong>User email:</strong> {booking.email}
      </p>
      <p>
        <strong>Pickup location:</strong> {booking.source}
      </p>
      <p>
        <strong>Drop location:</strong> {booking.destination}
      </p>
      <p>
        <strong>Estimated Time:</strong> {booking.estimatedTime} mins
      </p>
      <p>
        <strong>Booking Price:</strong> {booking.bookingPrice} rupees
      </p>
      <p>
        <strong>Cab name:</strong> {booking.cab.name}
      </p>
      <button
        onClick={() => onEdit(booking._id)}
        className="bg-yellow-500 text-white rounded p-2 mt-6 mx-2"
      >
        Edit Booking
      </button>
      <button
        onClick={() => onDelete(booking._id)}
        className="bg-red-500 text-white rounded p-2 mt-6 mx-2"
      >
        Delete Booking
      </button>
    </div>
  );
};

export default Booking;
