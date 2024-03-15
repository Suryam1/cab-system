import React, { useState } from "react";
import Cab from "./Cab";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const CabsForm = () => {
  const [cabName, setCabName] = useState("");
  const [cabPricePerMinute, setCabPricePerMinute] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const isFirstFormValid = () => {
    return cabName.trim() !== "" && cabPricePerMinute.trim() !== "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bookingData = {
      name:cabName  ,
      price: cabPricePerMinute,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cabs/addCab`,
        bookingData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Cab created successfully", response.data);
      setConfirmationMessage("Cab created successfully!");
      setErrorMessage("");

      // Clear input fields
        setCabName("");
        setCabPricePerMinute("");
        
    } catch (error) {
      setErrorMessage(
        "Could not create the cab! Please try again after sometime!"
      );
      setConfirmationMessage("");
      console.log("Error creating booking", error);
    }
    navigate("/allCabs");
  };

  return (
    <div className="max-w-lg mt-9 mx-auto p-6 bg-white rounded shadow-md">
      <div className="flex justify-center items-center space-x-6 py-2">
        <h1 className="text-2xl font-semibold mb-4">Add Cab</h1>
        <Link to="/">
          <button className="bg-blue-500 text-white rounded p-3 my-3">
            Home
          </button>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-md mb-2 font-medium text-gray-600"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border rounded-md"
            value={cabName}
            onChange={(e) => setCabName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="rate"
            className="block text-md mb-2 font-medium text-gray-600"
          >
            Rate:
          </label>
          <input
            type="text"
            id="rate"
            className="w-full p-2 border rounded-md"
            value={cabPricePerMinute}
            onChange={(e) => setCabPricePerMinute(e.target.value)}
            required
          />
        </div>

        <button
          className={`${
            isFirstFormValid()
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          } rounded p-2 w-full font-semibold mb-4`}
          disabled={!isFirstFormValid()}
        >
          Add Cabs
        </button>

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
};

export default CabsForm;
