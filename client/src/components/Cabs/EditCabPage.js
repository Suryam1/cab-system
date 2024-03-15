import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import {Link} from "react-router-dom";

const EditCabPage = () => {
  const { cabId } = useParams();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cabName, setCabName] = useState("");
  const [cabPricePerMinute, setCabPricePerMinute] = useState("");

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_API_URL}/cabs/${cabId}`)
        .then((response) => {
            const data = response.data;
            setCabName(data.name);  
            setCabPricePerMinute(data.price);
        })
        .catch((error) => {
            console.log('Error fetching booking', error);
        });

}, [cabId]);

  const handleEditBooking = () => {
    const updatedBooking = {
      name:cabName,
        price:cabPricePerMinute
    };

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/cabs/${cabId}`,
        updatedBooking,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setSuccessMessage("Cab updated successfully");
      })
      .catch((error) => {
        setErrorMessage("Error updating cab");
        console.error("Error updating booking", error);
      });

    navigate("/allCabs");
  };
  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-md shadow-md">
      <div className="flex justify-center items-center space-x-6">
        <h1 className="text-2xl font-semibold mb-4">Edit Cab</h1>
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
            htmlFor="name"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border rounded-md"
            value={cabName}
            onChange={(e) => setCabName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-md mb-2 font-medium text-gray-600"
            htmlFor="rate"
          >
            Rate:
          </label>
          <input
            type="text"
            id="rate"
            className="w-full p-2 border rounded-md"
            value={cabPricePerMinute}
            onChange={(e) => setCabPricePerMinute(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white rounded p-2 w-full font-semibold"
          onClick={handleEditBooking}
        >
          Update Cab
        </button>
      </form>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default EditCabPage;
