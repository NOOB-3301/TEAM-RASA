import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("authToken");
export default function CourseCard({ course }) {
  const [IsUser, setIsUser] = useState(true);

  useEffect(() => {
    // console.log(jwtDecode(token));
    if (token) {
      const userPayload = jwtDecode(token);
      if (userPayload.role === "Teacher") {
        setIsUser(false);
      }
    }
  }, [localStorage.getItem("authToken")]);

  console.log("Image Link:", course.imageLink);

  const imageUrl = course.imageLink
  // Fallback image

  return (
    <div className="max-w-md p-6 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-xl shadow-lg border border-gray-300 relative overflow-hidden group transform transition-all">
      {/* Course Image */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={imageUrl}
          alt={course.title}
          className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300";
          }}
        />
        {/* Image Overlay Effect */}
        <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300"></div>
      </div>

      {/* Course Title */}
      <h2 className="text-2xl font-extrabold text-gray-900 mt-4">
        {course.title}
      </h2>
      <p className="text-gray-700 mt-2 text-sm leading-relaxed">
        {course.desc}
      </p>

      {/* Course Details */}
      <div className="mt-4 text-sm">
        <p className="text-gray-900 font-semibold">
          <span className="text-[#0F6B5E]">
            Instructor: {course.user?.username}
          </span>
        </p>
        <p className="text-gray-600">Lecture Timing: {course.lectureTiming}</p>
      </div>

      {/* Buttons */}
      {IsUser ? (
        <Link to={`/courses/details/${course._id}`}>
          <button className="mt-6 w-full py-3 text-white font-semibold bg-[#0F6B5E] rounded-lg shadow-md hover:bg-[#0a4e42] transition-all transform hover:-translate-y-1">
            Enroll Course
          </button>
        </Link>
      ) : (
        <Link to={`/courses/view/${course._id}`}>
          <button className="mt-6 w-full py-3 text-white font-semibold bg-[#0F6B5E] rounded-lg shadow-md hover:bg-[#0a4e42] transition-all transform hover:-translate-y-1">
            View Course
          </button>
        </Link>
      )}
    </div>
  );
}
