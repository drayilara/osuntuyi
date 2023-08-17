import React, { useState } from 'react';

const CreateForm = ({setShowAdd}) => {
  const [formData, setFormData] = useState({
    age: '',
    name: '',
    insurance: '',
    status: '',
    diagnosis: '',
    lastSeen: '',
    hospitalNumber: ""
  });

  const handleFormChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('Form data:', formData);
    // You can perform further actions with the collected form data
  };

  return (
    <div className="min-h-screen  flex justify-center items-center">
      <div className="p-8 rounded shadow-md  w-[60%]">
        <h2 className="text-xl font-semibold mb-6">Patient Information</h2>
        <form onSubmit={handleSubmit}>
          {/* Age */}
          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              type="text"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleFormChange}
              className="mt-1 p-2 block w-full rounded-md  shadow-sm border border-blue-300 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              className="mt-1 p-2 block w-full rounded-md  shadow-sm border border-blue-300 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Insurance */}
          <div className="mb-4">
            <label
              htmlFor="insurance"
              className="block text-sm font-medium text-gray-700"
            >
              Insurance
            </label>
            <input
              type="text"
              id="insurance"
              name="insurance"
              value={formData.insurance}
              onChange={handleFormChange}
              className="mt-1 p-2 block w-full rounded-md  shadow-sm border border-blue-300 focus:ring focus:ring-blue-200"
            />
                  </div>
                  

                    <div className="mb-4">
            <label
              htmlFor="insurance"
              className="block text-sm font-medium text-gray-700"
            >
              Hospital Number
            </label>
            <input
              type="text"
              id="insurance"
              name="insurance"
              value={formData.hospitalNumber}
              onChange={handleFormChange}
              className="mt-1 p-2 block w-full rounded-md  shadow-sm border border-blue-300 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Status */}
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleFormChange}
              className="mt-1 p-2 block w-full rounded-md  shadow-sm border border-blue-300 focus:ring focus:ring-blue-200"
            >
              <option value="stable">Stable</option>
              <option value="improving">Improving</option>
              <option value="critical">Critical</option>
                    </select>
          </div>

          {/* Diagnosis */}
          <div className="mb-4">
            <label
              htmlFor="diagnosis"
              className="block text-sm font-medium text-gray-700"
            >
              Diagnosis
            </label>
            <input
              type="text"
              id="diagnosis"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleFormChange}
              className="mt-1 p-2 block w-full rounded-md  shadow-sm border border-blue-300 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Last Seen */}
          <div className="mb-4">
            <label
              htmlFor="lastSeen"
              className="block text-sm font-medium text-gray-700"
            >
              Last Seen By
            </label>
            <input
              type="text"
              id="lastSeen"
              name="lastSeen"
              value={formData.lastSeen}
              onChange={handleFormChange}
              className="mt-1 p-2 block w-full rounded-md  shadow-sm border border-blue-300 focus:ring focus:ring-blue-200"
            />
          </div>

            <div className="flex gap-x-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Submit
        </button>
                  
        <button
            onClick={() => setShowAdd(false)}
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Cancel
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
