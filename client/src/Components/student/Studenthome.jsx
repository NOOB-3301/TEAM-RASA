import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Navbar from "../Navbar";
import CourseCard from "../Courses/CourseCard";

function Studenthome() {
  const [studentName, setStudentName] = useState("Student");
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]); // New state for enrolled courses

  useEffect(() => {
    const fetchStudentData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No access token found!");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/v1/profile/getProfile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStudentName(response.data.fetchedUser.username);
        setPurchasedCourses(response.data.purchasedCourses || []);
      } catch (error) {
        console.error("Error fetching student profile:", error.response?.data || error.message);
      }
    };

    fetchStudentData();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/course/getallcourse");
        const data = await response.json();

        if (response.ok) {
          setCourses(data.fetchedCourses || []);
        } else {
          console.error("Error fetching courses:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Fetch enrolled courses
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No access token found!");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/v1/course/getenrollcourse", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data)
        if (response.data.fetchedCourses) {
          setEnrolledCourses(response.data.fetchedCourses);
        }
      } catch (error) {
        console.error("Error fetching enrolled courses:", error.response?.data || error.message);
      }
    };

    fetchEnrolledCourses();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
        <div className="mt-16"></div>
        
        {/* Welcome Section */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-gray-800 mb-6"
        >
          Welcome, {studentName}! 👋
        </motion.h1>

        {/* Join a Class Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-64 p-4 mb-6 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Join a Class
        </motion.button>

        <div className="w-full max-w-4xl">
          {/* Purchased Courses */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-bold mb-4">Purchased Courses</h2>
            {purchasedCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {purchasedCourses.map((course) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">No purchased courses yet.</p>
            )}
          </motion.div> */}

          {/* Enrolled Courses Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md mt-6"
          >
            <h2 className="text-xl font-bold mb-4">Enrolled Courses</h2>
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {enrolledCourses.map((course) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">No enrolled courses yet.</p>
            )}
          </motion.div>

          {/* Explore Courses Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md mt-6"
          >
            <h2 className="text-xl font-bold mb-4">Explore Courses</h2>
            <p className="text-gray-600 mb-4">Discover new courses and expand your knowledge!</p>

            {courses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {courses.slice(0, 3).map((course) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">No courses available.</p>
            )}

            {/* Browse More Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition duration-200"
              onClick={() => window.location.href = "/courses"}
            >
              Browse More <FiArrowRight className="text-lg" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Studenthome;
