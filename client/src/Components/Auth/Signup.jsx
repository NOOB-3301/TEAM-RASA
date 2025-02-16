import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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
      localStorage.setItem("authToken", data.token);
      const userPayload = jwtDecode(data.token);
      if (userPayload.role === "Teacher") {
        window.location.href = "/teacher";
      } else {
        window.location.href = "/student";
      }
    } else {
      console.error("Signup failed:", data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f0f4ff] to-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 rounded-3xl shadow-2xl max-w-md w-full bg-white border border-gray-300"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900">Sign Up</h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0F6B5E]"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0F6B5E]"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0F6B5E]"
          />

          <div className="flex justify-around">
            <label
              className={`flex items-center justify-center w-24 h-10 border-2 ${

                formData.role === "Teacher" ? "border-black" : "border-gray-300"
              } rounded cursor-pointer`}
            >
              <input
                type="radio"
                name="role"
                value="Teacher"
                onChange={handleChange}
                className="hidden"
              />
              Teacher
            </label>
            <label
              className={`flex items-center justify-center w-24 h-10 border-2 ${
                formData.role === "Student" ? "border-black" : "border-gray-300"
              } rounded cursor-pointer`}
            >
              <input
                type="radio"
                name="role"
                value="Student"
                onChange={handleChange}
                className="hidden"
              />
              Student
            </label>
          </div>
          {formData.role === "Teacher" && (
            <div className="space-y-2">
              <label className="block text-[#0F6B5E] font-semibold">
                Qualification
              </label>
              <select
                name="qualification"
                value={formData.qualification || ""}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#0F6B5E]"
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
