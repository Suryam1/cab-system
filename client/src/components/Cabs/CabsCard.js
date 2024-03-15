import React from "react";

const CabsCard = ({ cab, handleEditBooking, handleDeleteBooking }) => {

    

  return (
    <div>
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md mb-4">
        <div>
          <h1 className="text-xl font-semibold">Cab Name: {cab.name}</h1>
          <p className="text-gray-600">Price per Minute: {cab.price}</p>
        </div>
        <div>
          <button
            onClick={() => handleEditBooking(cab._id)}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2"
          >
            Edit
          </button>
          {/* <button
            onClick={() => handleDeleteBooking(cab._id)}
            className="bg-red-500 hover:bg-red-600 text-white rounded-md p-2 ml-2"
          >
            Delete
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CabsCard;
