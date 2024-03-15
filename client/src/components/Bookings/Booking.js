import React from "react";

const Booking = ({ booking, onEdit, onDelete }) => {
  const isCabBusy = new Date(booking.cab.busyDuration) > new Date();

  return (
    <div className="flex flex-col justify-center items-center mt-9 p-3 py-6 border border-gray-300 rounded-md shadow-md bg-white">
      <p className="mb-2">
        <strong className="text-gray-800">User email:</strong> {booking.email}
      </p>
      <p className="mb-2">
        <strong className="text-gray-800">Pickup location:</strong>{" "}
        {booking.source}
      </p>
      <p className="mb-2">
        <strong className="text-gray-800">Drop location:</strong>{" "}
        {booking.destination}
      </p>
      <p className="mb-2">
        <strong className="text-gray-800">Estimated Time:</strong>{" "}
        {booking.estimatedTime} mins
      </p>
      <p className="mb-2">
        <strong className="text-gray-800">Booking Price:</strong>{" "}
        {booking.bookingPrice} rupees
      </p>
      <p className="mb-4">
        <strong className="text-gray-800">Cab name:</strong> {booking.cab.name}
      </p>
      {/* <p className="mb-4">
        <strong className="text-gray-800">Status:</strong>{" "}
        {isCabBusy ? "In Progress" : "Completed"}
      </p> */}

      <div className="flex">
        {/* <button
          onClick={() => onEdit(booking._id)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full py-2 px-4 mt-4 mx-2 transition-colors"
        >
          Edit Booking
        </button> */}
        <button
          onClick={() => onDelete(booking._id)}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full py-2 px-4 mt-4 mx-2 transition-colors"
        >
          Delete Booking
        </button>
      </div>
    </div>
  );
};

export default Booking;
