import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#f0f4ff] to-white">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-900">Login</h2>
        <p className="text-center text-gray-600 mb-6">Welcome back! Please login to your account.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F6B5E]"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F6B5E]"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-6 py-3 bg-[#0F6B5E] text-white rounded-xl font-bold hover:bg-[#0a4e42] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Login
          </button>
        </form>
        
        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-[#0F6B5E] font-semibold hover:underline">
            Forgot Password?
          </Link>
        </div>
        
        <div className="text-center mt-4 text-gray-600">
          Don't have an account? 
          <Link to="/signup" className="text-[#0F6B5E] font-semibold hover:underline ml-1">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
