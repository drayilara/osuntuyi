import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import db from "@/firebase";
import { Spin } from "antd";

const EditForm = ({ setShowEdit, editRecord, getAllPatients }) => {
  const [formData, setFormData] = useState({
    id: editRecord.id,
    age: editRecord.age,
    name: editRecord.name,
    insurance: editRecord.insurance,
    status: editRecord.status,
    diagnosis: editRecord.diagnosis,
    lastSeen: editRecord.lastSeen,
    hospitalNumber: editRecord.hospitalNumber,
  });

  const [updating, setUpdating] = useState(false);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form data:", formData);
    // You can perform further actions with the collected form data
    const {
      age,
      name,
      insurance,
      status,
      diagnosis,
      lastSeen,
      hospitalNumber,
      id,
    } = formData;

    if (
      age &&
      name &&
      insurance &&
      status &&
      diagnosis &&
      lastSeen &&
      hospitalNumber
    ) {
      const patientRef = doc(db, "patients", id);
      setUpdating(true);
      await updateDoc(patientRef, {
        age,
        name,
        insurance,
        status,
        diagnosis,
        lastSeen,
        hospitalNumber,
      });

      await getAllPatients();
      setUpdating(false);
      setShowEdit(false);
    } else {
      alert("Please complete all fields");
    }
  };

  return (
    <div className="min-h-screen  flex justify-center items-center">
      <div className="p-8 rounded shadow-md w-full md:w-[70%] mt-4">
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
              name="hospitalNumber"
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
              placeholder="Select a status"
              className="mt-1 p-2 block w-full rounded-md  shadow-sm border border-blue-300 focus:ring focus:ring-blue-200"
            >
              <option disabled selected value="">
                Select an option
              </option>
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

          <div className="flex gap-4 flex-wrap">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              {updating ? <Spin /> : "Update"}
            </button>

            <button
              onClick={() => setShowEdit(false)}
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

export default EditForm;
