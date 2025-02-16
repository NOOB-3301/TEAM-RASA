import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Navbar";
import CourseCard from "../Courses/CourseCard";
import LiveClass from "./LiveClass"; // Import the video call component

const userId = localStorage.getItem("u_id");

function Teacherhome() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLive, setIsLive] = useState(false); // Manage live class state
  const coursesPerPage = 4;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("auth_token"); 
        const response = await fetch("http://localhost:3000/api/v1/course/getcoursebyeacher", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ u_id: userId }),
        });

        const data = await response.json();
        if (response.ok) {
          setCourses(data.fetchedCourses);
        } else {
          console.error("Failed to fetch courses:", data.message);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    if (userId) fetchCourses();
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#f0f4ff] to-white">
        <div className="mt-28"></div>

        {/* Buttons */}
        <div className="flex gap-4 mb-6">
          {/* Start Live Class Button */}
          <motion.button
            onClick={() => setIsLive(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-48 p-4 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition duration-200"
          >
            Start Live Class
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-48 p-4 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition duration-200"
          >
            Publish Course
          </motion.button>
        </div>

        {/* Show Live Class when started */}
        {isLive && <LiveClass userId={userId} />}

        {/* Course List */}
        <motion.div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Published Courses</h2>
          {courses.length > 0 ? (
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courses.map((course) => (
                <motion.div key={course._id}>
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-gray-600 text-center">No courses published yet.</p>
          )}
        </motion.div>
      </div>
    </>
  );
}

export default Teacherhome;
