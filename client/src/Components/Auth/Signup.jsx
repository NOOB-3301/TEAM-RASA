// Signup.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
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
          <button type="submit" className="w-full p-3 rounded bg-black hover:bg-gray-800 text-white font-bold">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-black font-semibold hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}
