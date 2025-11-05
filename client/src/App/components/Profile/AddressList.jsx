import React, { useState } from "react";

const AddressList = ({ addresses = [], onUpdate }) => {
  const [newAddress, setNewAddress] = useState({
    street: "", city: "", state: "", country: "", zipCode: ""
  });

  const handleAdd = () => {
    onUpdate({ addresses: [...addresses, newAddress] });
    setNewAddress({ street: "", city: "", state: "", country: "", zipCode: "" });
  };

  const handleDelete = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    onUpdate({ addresses: updated });
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-2xl border border-gray-100">
      <h2 className="text-2xl font-semibold text-amber-600 mb-4">Addresses</h2>
      {addresses.map((addr, i) => (
        <div key={i} className="border p-3 rounded-md mb-2 flex justify-between items-center">
          <p>{addr.street}, {addr.city}, {addr.state}, {addr.country} - {addr.zipCode}</p>
          <button
            onClick={() => handleDelete(i)}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Delete
          </button>
        </div>
      ))}

      <div className="space-y-2 mt-4">
        {Object.keys(newAddress).map((key) => (
          <input
            key={key}
            placeholder={key}
            value={newAddress[key]}
            onChange={(e) => setNewAddress({ ...newAddress, [key]: e.target.value })}
            className="w-full p-2 border rounded-md focus:outline-amber-500"
          />
        ))}
        <button
          onClick={handleAdd}
          className="w-full bg-amber-500 text-white py-2 rounded-md hover:bg-amber-600 transition"
        >
          Add Address
        </button>
      </div>
    </div>
  );
};

export default AddressList;
