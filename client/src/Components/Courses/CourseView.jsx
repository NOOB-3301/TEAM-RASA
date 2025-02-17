import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const CourseView = () => {
  const [videoList, setVideoList] = useState([]);
  const [isStudent, setIsStudent] = useState(true);
  const callId = crypto.randomUUID();

  const { id: courseId } = useParams();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const userpayload = jwtDecode(token);

      if (userpayload.role === "Teacher") {
        setIsStudent(false);
      }
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Video List */}
      <div className="w-1/4 bg-white shadow-lg rounded-lg p-4 overflow-y-auto">
        <h2 className="text-xl font-bold text-[#0F6B5E] mb-4">Course Videos</h2>
        <ul className="space-y-2">
          {videoList.map((video, index) => (
            <li
              key={index}
              className="p-3 bg-[#14887a] text-white rounded-lg shadow-md cursor-pointer hover:bg-[#0F6B5E] transition"
              onClick={() => setVideoUrl(video.url)}
            >
              <p className="font-medium">{video.title}</p>
              <p className="text-sm opacity-80">{video.duration}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 flex flex-col items-center justify-center space-y-6 p-6">
        {/* Buttons Section */}
        <div className="flex space-x-4">
          <Link to={`/courses/${courseId}/${callId}`}>
            <button className="px-6 py-3 bg-[#0F6B5E] text-white font-semibold rounded-lg shadow-md hover:bg-[#14887a] transition">
              Start Class
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseView;
