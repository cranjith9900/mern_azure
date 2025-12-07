import "./App.css";
import { useState } from "react";
import axios from "axios";
import baseUrl from "./baseUrl";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    lastName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveData = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/create`, user)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create</h1>

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-5">
        <input
          placeholder="First Name"
          onChange={handleChange}
          name="name"
          value={user.name}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          placeholder="Last Name"
          onChange={handleChange}
          name="lastName"
          value={user.lastName}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <button
          onClick={saveData}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Save to MongoDB
        </button>

        <button
          onClick={() => navigate(-1)}
          className="w-full bg-gray-500 text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}
