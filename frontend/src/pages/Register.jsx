import { useState } from "react";
import axios from "axios";
import campus from "../assets/campus.jpg";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
        role,
      });
      alert("Signup successful!");
      navigate("/login");
      // navigate to dashboard or login
    } catch (err) {
      console.error(err);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
      {/* Left Image */}
      <div className="md:w-1/2 flex items-center justify-center p-6 ">
        <img
          src={campus}
          alt="Smart Campus"
          className="rounded-lg shadow-md w-full max-w-[600px] ring-1 ring-indigo-300"
        />
      </div>

      {/* Right Form */}
      <div className="md:w-1/2 flex items-center justify-center p-6">
        <form
          onSubmit={handleSignup}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-md ring-2 ring-indigo-400"
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
            Create Your Account
          </h2>

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
