import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Navbar from "../Navbar";
import CourseCard from "../Courses/CourseCard";

function Studenthome() {
  const [studentName, setStudentName] = useState("Student");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No access token found!");
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/profile/getProfile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStudentName(response.data.fetchedUser.username);
      } catch (error) {
        console.error(
          "Error fetching student profile:",
          error.response?.data || error.message
        );
      }
    };
    fetchStudentData();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/course/getallcourse"
        );
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

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No access token found!");
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/course/getenrollcourse",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.fetchedCourses) {
          setEnrolledCourses(response.data.fetchedCourses);
        }
      } catch (error) {
        console.error(
          "Error fetching enrolled courses:",
          error.response?.data || error.message
        );
      }
    };
    fetchEnrolledCourses();
  }, []);

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-[#E6F2EF] text-[#0F6B5E] flex flex-col items-center p-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold mt-16"
        >
          Welcome, {studentName}!
        </motion.h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-6 py-3 bg-[#0F6B5E] text-white font-bold rounded-lg shadow-md hover:bg-[#14887a] transition duration-300"
        >
          Join a Class
        </motion.button>

        <div className="w-full max-w-5xl mt-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-2xl shadow-md border border-[#0F6B5E]"
          >
            <h2 className="text-xl font-bold mb-4">Enrolled Courses</h2>
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
              <p className="text-center text-[#14887a]">
                No enrolled courses yet.
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-2xl shadow-md mt-6 border border-[#0F6B5E]"
          >
            <h2 className="text-xl font-bold mb-4">Explore Courses</h2>
            <p className="text-[#14887a] mb-4">
              Discover new courses and expand your knowledge!
            </p>
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
              <p className="text-center text-[#14887a]">
                No courses available.
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-[#0F6B5E] text-white font-bold rounded-lg shadow-md hover:bg-[#14887a] transition duration-300"
              onClick={() => (window.location.href = "/courses")}
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
