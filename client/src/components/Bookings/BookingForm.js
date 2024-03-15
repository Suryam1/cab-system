import React, { useState } from "react";
import Cab from "../Cabs/Cab";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function BookingForm() {
  const [source, setSource] = useState("Bangalore");
  const [destination, setDestination] = useState("Bangalore");
  const [userEmail, setUserEmail] = useState("");
  const [availableCabs, setAvailableCabs] = useState([]);
  const [shortestTime, setShortestTime] = useState("");
  const [selectedCabId, setSelectedCabId] = useState("");
  const [showAvailableCabs, setShowAvailableCabs] = useState(false);
  const [cab, setCabData] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [startTime, setStartTime] = useState(new Date().getTime());
  const navigate = useNavigate();

  const isFirstFormValid = () => {
    console.log("userEmail", userEmail);
    console.log("source", source);
    console.log("destination", destination);
    return (
      userEmail.trim() !== "" &&
      source.trim() !== "" &&
      destination.trim() !== "" &&
      startTime !== "" &&
      source !== destination
    );
  };

  const fetchCabs = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/cabs`, {
          params: {
            startTime,
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

  const showAvailableCabsFunc = (event) => {
    event.preventDefault();
    // Check if the form is valid before fetching cabs
    if (isFirstFormValid()) {
      calculateShortestTimeEndPoint(source, destination);
      fetchCabs();
      if (source !== "" && destination !== "" && source === destination) {
        console.log("Source and Destination are same");
        setShowAvailableCabs(false);
      }

      setShowAvailableCabs(true);
    }
  };

  const handleCabSelection = (cab) => {
    setSelectedCabId(cab._id);
    setCabData(cab);
    setEstimatedPrice(shortestTime * cab?.price);
  };

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
          setErrorMessage("");
        }

        if (response.data.hasOwnProperty("error")) {
          console.log("Error calculating shortest time", response);
          setErrorMessage(response.data.error);
          setShowAvailableCabs(false);
        }
      })
      .catch((error) => {
        setErrorMessage("Error calculating shortest time");
        console.log("Error calculating shortest time", error);
        setShowAvailableCabs(false);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const bookingPrice = shortestTime * cab.price;

    const bookingData = {
      email: userEmail,
      source,
      destination,
      cab,
      startTime,
      bookingPrice,
      estimatedTime: shortestTime,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/bookings/addBooking`,
        bookingData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Booking created successfully", response.data);
      setConfirmationMessage("Booking created successfully!");
      setErrorMessage("");

      // Clear input fields
      setUserEmail("");
      setSource("");
      setDestination("");
      setStartTime("");
      setSelectedCabId("");
      setEstimatedPrice("");

      setShowAvailableCabs(false);
    } catch (error) {
      setErrorMessage(
        "Could not create the booking! Please try again after sometime!"
      );
      setConfirmationMessage("");
      console.log("Error creating booking", error);
    }
    navigate("/allBookings");
  };

  return (
    <div className="max-w-lg mt-9 mx-auto p-6 bg-white rounded shadow-md">
      <div className="flex justify-center items-center space-x-6 py-2">
        <h1 className="text-2xl font-semibold mb-4">Create Booking</h1>
        <Link to="/">
          <button className="bg-blue-500 text-white rounded p-3 my-3">
            Home
          </button>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="userEmail"
            className="block text-md mb-2 font-medium text-gray-600"
          >
            User Email:
          </label>
          <input
            type="email"
            id="userEmail"
            className="w-full p-2 border rounded-md"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="source"
            className="block text-md mb-2 font-medium text-gray-600"
          >
            Source:
          </label>
          <select
            id="source"
            className="w-full p-2 border rounded-md"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          >
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>
          {/* <input
            type="text"
            id="source"
            className="w-full p-2 border rounded-md"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          /> */}
        </div>
        <div className="mb-4">
          <label
            htmlFor="destination"
            className="block text-md mb-2 font-medium text-gray-600"
          >
            Destination:
          </label>
          <select
            id="destination"
            className="w-full p-2 border rounded-md"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          >
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>
          {/* <input
            type="text"
            id="destination"
            className="w-full p-2 border rounded-md"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          /> */}
        </div>

        <button
          onClick={showAvailableCabsFunc}
          className={`${
            isFirstFormValid()
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          } rounded p-2 w-full font-semibold mb-4`}
          disabled={!isFirstFormValid()}
        >
          Show Available Cabs
        </button>

        {shortestTime &&
          shortestTime !== 0 &&
          source !== "" &&
          destination !== "" &&
          source !== destination && (
            <p className="text-lg font-semibold mb-4">
              Shortest Time: {shortestTime} minutes
            </p>
          )}

        {source !== "" && destination !== "" && source === destination && (
          <p className="text-lg font-semibold mb-4">
            {" "}
            Source and Destination are same!
          </p>
        )}

        {showAvailableCabs &&
          source !== "" &&
          destination !== "" &&
          source !== destination &&
          errorMessage === "" && (
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
                      isActive={cab._id === selectedCabId}
                      onSelect={() => handleCabSelection(cab)}
                    />
                  ))}
                </div>
              </ul>

              {estimatedPrice && estimatedPrice !== "" ? (
                <p className="text-lg font-semibold mb-4">
                  Booking Price: {estimatedPrice} rupees
                </p>
              ) : (
                <></>
              )}

              <button
                type="submit"
                className={`${
                  selectedCabId
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                } rounded p-2 w-full font-semibold mt-4`}
                disabled={!selectedCabId}
              >
                Create Booking
              </button>
            </div>
          )}
        {confirmationMessage && (
          <div className=" text-xl text-green-500 font-semibold mt-3">
            {confirmationMessage}
          </div>
        )}

        {errorMessage && (
          <div className="text-xl text-red-500 font-semibold mt-3">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
}

export default BookingForm;
