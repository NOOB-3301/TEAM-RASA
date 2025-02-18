import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const CourseView = () => {
  const { id } = useParams();
  const [videoList, setVideoList] = useState([]);
  const [isStudent, setIsStudent] = useState(true);
  const callId = crypto.randomUUID();
  const [course, setCourse] = useState(null);
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

  useEffect(() => {
    const fetchCourseVideos = async () => {
      const response = await axios.post(
        "http://localhost:3000/api/v1/course/getcoursedetails",
        { c_id: id }
      );
      setCourse(response.data.fetchedCourse);
    };
    fetchCourseVideos();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar - Video List */}
      <div className="w-full md:w-1/4 bg-white shadow-lg rounded-lg p-4 overflow-y-auto max-h-screen">
        <h2 className="text-2xl font-bold text-[#0F6B5E] mb-4 text-center">
          Course Videos
        </h2>
        <ul className="space-y-3">
          {videoList.map((video, index) => (
            <li
              key={index}
              className="p-4 bg-[#14887a] text-white rounded-lg shadow-md cursor-pointer hover:bg-[#0F6B5E] transition duration-200 flex flex-col items-start"
            >
              <p className="font-medium text-lg">{video.title}</p>
              <p className="text-sm opacity-80">{video.duration}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 flex flex-col items-center justify-center space-y-8 p-6">
        {/* Course Description */}
        {course && (
  <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden p-8">
    <h1 className="text-4xl font-bold text-[#0F6B5E] mb-6 text-center">
      {course.title}
    </h1>

    {/* Centering Image */}
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl aspect-w-16 aspect-h-9 overflow-hidden rounded-xl">
        <img
          src={course.imageLink}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    <p className="text-xl text-gray-800 mt-6 leading-relaxed text-center">
      {course.description}
    </p>
  </div>
)}


        {/* Buttons Section */}
        <div className="flex justify-center items-center space-x-4">
          <Link to={`/courses/${courseId}/${callId}`}>
            <button className="px-6 py-3 bg-[#0F6B5E] text-white font-semibold rounded-lg shadow-md hover:bg-[#14887a] transition duration-200">
              Start Class
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseView;
