import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CabsCard from "./CabsCard";
import { useNavigate } from "react-router";
import axios from "axios";

const AllCabs = () => {
  const navigate = useNavigate();
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/cabs/allCabs`
      );

      if (response.statusText.length > 0) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.data;
      setCabs(data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", { error: error.message });
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleEditBooking = (cabId) => {
    fetchBookings();
    navigate(`/edit-cab/${cabId}`);
  };

  const handleDeleteBooking = (cabId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/cabs/${cabId}`)
      .then(() => {
        console.log("Booking successfully deleted!");
        setCabs((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== cabId)
        );
      })
      .catch((error) => {
        console.log("Error deleting booking", error);
      });
    fetchBookings();
  };

  return (
    <div className="max-w-5xl flex flex-col mt-16 mb-16 mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-semibold mb-4">All Cabs</h1>
      {/* <p className="text-gray-600">No bookings available.</p> */}
      <div className="flex justify-center items-center space-x-6">
        <Link to="/">
          <button className="bg-blue-500 text-white rounded p-3 my-3">
            Home
          </button>
        </Link>
        {/* <Link to="/addCabs">
          <button className="bg-blue-500 text-white rounded p-3 my-3">
            Add Cabs
          </button>
        </Link> */}
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : cabs.length > 0 ? (
        <div className="mt-8">
          {cabs
            .sort((a, b) => a.price - b.price)
            .map((cab) => (
              <CabsCard
                key={cab._id}
                cab={cab}
                handleEditBooking={handleEditBooking}
                handleDeleteBooking={handleDeleteBooking}
              />
            ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-4">No cabs available.</p>
      )}
    </div>
  );
};

export default AllCabs;
