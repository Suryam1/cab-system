import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import Cab from "../Cabs/Cab";
import { Link } from "react-router-dom";

function EditBookingPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [availableCabs, setAvailableCabs] = useState([]);
  const [email, setUserEmail] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [cabActive, setCabActive] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [shortestTime, setShortestTime] = useState("");

  const handleCabSelection = (cab) => {
    setCabActive(cab);
    setEstimatedPrice(shortestTime * cab.price);
  };

  useEffect(() => {
    if (cabActive !== "") {
      setEstimatedPrice(shortestTime * cabActive.price);
    }
  }, [shortestTime]);

  const calculateShortestTimeEndPoint = (source, destination) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/path/calculateShortestTime`, {
        params: {
          source,
          destination,
        },
      })
      .then((response) => {
        if (response.data.hasOwnProperty("time")) {
          setShortestTime(response.data.time);
          setEstimatedPrice(shortestTime * cabActive.price);
        }

        if (response.data.hasOwnProperty("error")) {
          console.log("Error calculating shortest time", response);
        }
      })
      .catch((error) => {
        console.log("Error calculating shortest time", error);
      });
  };

  const fetchCabs = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/cabs`, {
          params: {
            startTime: new Date(),
          },
        })
        .then((response) => {
          const filteredCabs = response.data;
          setAvailableCabs(filteredCabs);
        });
    } catch (error) {
      console.log("Error fetching cabs:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/bookings/${bookingId}`)
      .then((response) => {
        const data = response.data;
        fetchCabs();

        setCabActive(data.cab);
        setUserEmail(data.email);
        setSource(data.source);
        setDestination(data.destination);
        setEstimatedPrice(data.bookingPrice);
        setShortestTime(data.estimatedTime);
      })
      .catch((error) => {
        console.log("Error fetching booking", error);
      });
  }, [bookingId]);

  const handleEditBooking = () => {
    const updatedBooking = {
      email,
      source,
      destination,
      cab: cabActive,
      bookingPrice: estimatedPrice,
      estimatedTime: shortestTime,
      startTime: new Date(),
    };

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/bookings/${bookingId}`,
        updatedBooking,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setSuccessMessage("Booking updated successfully");
      })
      .catch((error) => {
        setErrorMessage("Error updating booking");
        console.error("Error updating booking", error);
      });

    navigate("/allBookings");
  };

  const handleLocationChange = (location) => {
    calculateShortestTimeEndPoint(location.source, location.destination);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-md shadow-md">
      <div className="flex justify-center items-center space-x-6">
        <h1 className="text-2xl font-semibold mb-4">Edit Booking</h1>
        <Link to="/">
          <button className="bg-blue-500 text-white rounded p-3 my-3">
            Home
          </button>
        </Link>
      </div>
      <form>
        <div className="mb-4">
          <label
            className="block text-md mb-2 font-medium text-gray-600"
            htmlFor="userEmail"
          >
            User Email:
          </label>
          <input
            type="email"
            id="userEmail"
            className="w-full p-2 border rounded-md"
            value={email}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-md mb-2 font-medium text-gray-600"
            htmlFor="source"
          >
            Source:
          </label>
          <input
            type="text"
            id="source"
            className="w-full p-2 border rounded-md"
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
              e.target.value !== ""
                ? handleLocationChange({
                    source: e.target.value,
                    destination: destination,
                  })
                : setEstimatedPrice("");
            }}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-md mb-2 font-medium text-gray-600"
            htmlFor="destination"
          >
            Destination:
          </label>
          <input
            type="text"
            id="destination"
            className="w-full p-2 border rounded-md"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              e.target.value !== ""
                ? handleLocationChange({
                    destination: e.target.value,
                    source: source,
                  })
                : setEstimatedPrice("");
            }}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-md mb-2 font-medium text-gray-600"
            htmlFor="cabName"
          >
            Booking Price:
          </label>
          <input
            type="text"
            id="cabName"
            disabled
            className="w-full p-2 border rounded-md"
            value={estimatedPrice}
            onChange={(e) => setEstimatedPrice(e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Available Cabs</h2>
          <ul>
            {availableCabs.length === 0 && (
              <div>
                <p>No cabs available right now.</p>
                <p>Wait for a while.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableCabs.map((cab) => (
                <Cab
                  key={cab._id}
                  name={cab.name}
                  price={cab.price}
                  isActive={cab._id === cabActive._id}
                  onSelect={() => handleCabSelection(cab)}
                />
              ))}
            </div>
          </ul>
        </div>

        <button
          className="bg-blue-500 text-white rounded p-2 w-full font-semibold"
          onClick={handleEditBooking}
        >
          Update Booking
        </button>
      </form>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default EditBookingPage;
