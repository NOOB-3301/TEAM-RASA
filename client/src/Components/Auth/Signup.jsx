// Signup.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    qualification: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "/home";
    } else {
      console.error("Signup failed:", data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 rounded-lg shadow-lg w-96 bg-white border border-black"
      >
        <h2 className="text-3xl font-bold text-center">Sign Up</h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 rounded border border-black text-black placeholder-gray-600"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded border border-black text-black placeholder-gray-600"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded border border-black text-black placeholder-gray-600"
          />

          <div className="flex justify-around">
            <label
              className={`flex items-center justify-center w-24 h-10 border-2 ${
                formData.role === "teacher" ? "border-black" : "border-gray-300"
              } rounded cursor-pointer`}
            >
              <input
                type="radio"
                name="role"
                value="teacher"
                onChange={handleChange}
                className="hidden"
              />
              Teacher
            </label>
            <label
              className={`flex items-center justify-center w-24 h-10 border-2 ${
                formData.role === "student" ? "border-black" : "border-gray-300"
              } rounded cursor-pointer`}
            >
              <input
                type="radio"
                name="role"
                value="student"
                onChange={handleChange}
                className="hidden"
              />
              Student
            </label>
          </div>
          {formData.role === "teacher" && (
            <div className="space-y-2">
              <label className="block text-black font-semibold">
                Qualification
              </label>
              <select
                name="qualification"
                value={formData.qualification || ""}
                onChange={handleChange}
                className="w-full p-3 rounded border border-black text-black"
              >
                <option value="" disabled>
                  Select your qualification
                </option>
                <option value="12th">12th</option>
                <option value="graduate">Graduate</option>
                <option value="postgraduate">Post Graduate</option>
                <option value="phd">PhD</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}
          <button
            type="submit"
            className="w-full p-3 rounded bg-black hover:bg-gray-800 text-white font-bold"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-black font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
