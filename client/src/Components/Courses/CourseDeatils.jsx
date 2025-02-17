import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Navbar";
import axios from 'axios';

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/course/getcoursedetails",
          { c_id: id },
          { headers: { "Content-Type": "application/json" } }
        );
  
        console.log(response.data);
        if (response.status === 200) {
          console.log(response.data.fetchedCourse);
          setCourse(response.data.fetchedCourse);
        } else {
          setError(response.data.message || "Failed to fetch course details.");
        }
      } catch (error) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourseDetails();
  }, [id]);
  

  const handleEnroll = async () => {
    setEnrolling(true);
    setEnrollError("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setEnrollError("Authentication required. Please log in.");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/v1/course/enrollcourse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ c_id: id }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setSuccessMessage("Successfully enrolled in the course!");
      } else {
        setEnrollError(data.message || "Failed to enroll.");
      }
    } catch (error) {
      setEnrollError("Network error. Please try again.");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-10 text-lg font-semibold text-green-700">
        Loading course details...
      </div>
    );
  if (error)
    return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <>
      <div className="min-h-screen overflow-auto bg-gradient-to-b from-[#c6e0ff] via-[#f0f4ff] to-white flex flex-col items-center">
        <Navbar />
        <div className="mt-28"></div>

        <motion.div
          className="w-full max-w-5xl mx-auto flex-1 p-10 bg-white shadow-lg rounded-xl transition-all duration-300 group hover:shadow-2xl hover:scale-[1.02]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Course Image */}
          <div className="relative overflow-hidden rounded-lg">
            {course.imageLink && (
              <motion.img
                src={course.imageLink}
                alt={course.title}
                className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
              />
            )}
            {/* Image Overlay */}
            <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300"></div>
          </div>

          {/* Course Title */}
          <motion.h1
            className="text-4xl font-extrabold text-green-800 mt-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {course?.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-gray-700 mt-4 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {course.description}
          </motion.p>

          {/* Course Details */}
          <motion.div
            className="mt-6 space-y-3 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-gray-900 font-semibold">
              👨‍🏫 <span className="text-green-700">Instructor:</span> {course.user?.username || "Unknown"}
            </p>
            <p className="text-gray-900 font-semibold">
              🕒 <span className="text-blue-600">Lecture Timing:</span> {course.lectureTiming}
            </p>
          </motion.div>

          {/* Enroll Button */}
          <motion.button
            onClick={handleEnroll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 w-full py-3 text-white font-bold bg-gradient-to-r from-green-500 to-green-700 rounded-lg shadow-md hover:from-green-600 hover:to-green-800 transition-all transform hover:-translate-y-1"
            disabled={enrolling}
          >
            {enrolling ? "Enrolling..." : "🚀 Enroll Now"}
          </motion.button>

          {/* Success/Error Message */}
          {successMessage && (
            <motion.p
              className="mt-4 text-center text-green-700 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              ✅ {successMessage}
            </motion.p>
          )}
          {enrollError && (
            <motion.p
              className="mt-4 text-center text-red-600 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              ❌ {enrollError}
            </motion.p>
          )}
        </motion.div>
      </div>
    </>
  );
}
