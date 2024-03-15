import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-yellow-200 h-screen w-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div>
          <div>
            <img src="./images/online-taxi-booking.png" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold mb-6">Welcome to QuickCab</h1>
            <div className="flex justify-center items-center space-x-6">
              <Link to="/allBookings">
                <button className="bg-green-500 hover:bg-green-600 text-white rounded-md p-3">
                  Bookings
                </button>
              </Link>
              <Link to="/allCabs">
                <button className="bg-green-500 hover:bg-green-600 text-white rounded-md p-3">
                  Cabs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
