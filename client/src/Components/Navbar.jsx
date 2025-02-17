import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10">
      <div className="border-2 border-[#0F6B5E] bg-white/90 text-[#0F6B5E] px-8 py-2 rounded-full flex space-x-8 shadow-lg backdrop-blur-md transition-all duration-300">
        <Link
          to="/"
          className="px-4 py-2 font-semibold text-[#0F6B5E] hover:text-[#0a4e42] transition-all"
        >
          Home
        </Link>

        <Link
          to="/about"
          className="px-4 py-2 font-semibold text-[#0F6B5E] hover:text-[#0a4e42] transition-all"
        >
          About
        </Link>

        <Link
          to="/courses"
          className="px-4 py-2 font-semibold text-[#0F6B5E] hover:text-[#0a4e42] transition-all"
        >
          Courses
        </Link>

        <Link
          to="/profile"
          className="px-4 py-2 font-semibold text-[#0F6B5E] hover:text-[#0a4e42] transition-all"
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}
