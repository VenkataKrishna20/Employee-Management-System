import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddDepartment() {

  const navigate = useNavigate();

  const [dept, setDept] = useState({
    dep_name: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDept({ ...dept, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/department/add',
        dept,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      console.log(response.data);

      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }

    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert("Request failed");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h3 className="text-2xl font-bold mb-6">Add New Department</h3>
      <form onSubmit={handleSubmit} >
        <div>
          <label
            htmlFor="dep_name"
            className="text-sm font-medium text-gray-700"
          >
            Department Name
          </label>
          <input
            type="text"
            name="dep_name"
            placeholder="Enter Dept Name"
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mt-3">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 "
          >
            Description
          </label>
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            rows="4"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Department
        </button>
      </form>
    </div>
  );
}

export default AddDepartment;
