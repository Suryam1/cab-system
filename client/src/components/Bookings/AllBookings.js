import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Booking from "./Booking";
import { useNavigate } from "react-router";
import axios from "axios";

function BookingList() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/bookings`
        );

        if (!response.statusText) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.data;
        setBookings(data);
      } catch (error) {
        console.log("Error fetching data:", { error: error.message });
      }
    }

    fetchBookings();
  }, []);

  const handleEditBooking = (bookingId) => {
    navigate(`/edit-booking/${bookingId}`);
  };

  const handleDeleteBooking = (bookingId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/bookings/${bookingId}`)
      .then(() => {
        console.log("Booking successfully deleted!");
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
      })
      .catch((error) => {
        console.log("Error deleting booking", error);
      });
  };

  return (
    <div className="max-w-5xl flex flex-col mt-16 mb-16 mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-semibold mb-4">All Bookings</h1>
      {/* <p className="text-gray-600">No bookings available.</p> */}
      <div className="flex justify-center items-center space-x-6">
        <Link to="/">
          <button className="bg-blue-500 text-white rounded p-3 my-3">
            Home
          </button>
        </Link>
        <Link to="/addBooking">
          <button className="bg-blue-500 text-white rounded p-3 my-3">
            Add Booking
          </button>
        </Link>
      </div>
      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookings.map((booking) => (
            <Booking
              key={booking._id}
              booking={booking}
              onEdit={handleEditBooking}
              onDelete={handleDeleteBooking}
            />
          ))}
        </div>
      ) : (
        <div>
          <p>No Booking</p>
        </div>
      )}
    </div>
  );
}

export default BookingList;
