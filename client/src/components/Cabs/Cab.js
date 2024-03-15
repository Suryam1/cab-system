import React from 'react';

function Cab({ name, price, onSelect, isActive }) {
  const cabClassName = isActive
    ? 'bg-blue-500 border border-blue-700 text-white'
    : 'bg-white border border-gray-300 text-black';

  return (
    <div
      className={`rounded-md shadow-md p-4 mb-4 cursor-pointer ${cabClassName}`}
      onClick={onSelect}
    >
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-lg font-semibold">Rs {price}/min</p>
    </div>
  );
}

export default Cab;
