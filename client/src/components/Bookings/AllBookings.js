import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Booking from "./Booking";
import { useNavigate } from "react-router";
import axios from "axios";

function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md">
        <p className="text-lg font-semibold">
          Are you sure you want to delete this booking?
        </p>
        <div className="flex justify-center mt-4">
          <button
            className="bg-red-500 text-white rounded p-2 mr-4"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 text-gray-800 rounded p-2"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

function BookingList() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/bookings`
      );

      if (response.statusText.length > 0) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.data;
      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", { error: error.message });
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleEditBooking = (bookingId) => {
    navigate(`/edit-booking/${bookingId}`);
  };

  const handleDeleteBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowDeleteModal(true);
  };

  const confirmDeleteBooking = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/bookings/${selectedBookingId}`)
      .then(() => {
        console.log("Booking successfully deleted!");
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== selectedBookingId)
        );
      })
      .catch((error) => {
        console.log("Error deleting booking", error);
      })
      .finally(() => {
        setShowDeleteModal(false);
      });
  };

  return (
    <div className="max-w-5xl flex flex-col mt-16 mb-16 mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-semibold mb-4">All Bookings</h1>
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
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookings.map(
            (booking) =>
              booking.status === "scheduled" && (
                <Booking
                  key={booking._id}
                  booking={booking}
                  onEdit={handleEditBooking}
                  onDelete={handleDeleteBooking}
                />
              )
          )}
        </div>
      ) : (
        <div>
          <p>No Booking</p>
        </div>
      )}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteBooking}
      />
    </div>
  );
}

export default BookingList;
