import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CourseCard from "./CourseCard";
import Navbar from "../Navbar";
import {Link} from 'react-router-dom'

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/course/getallcourse");
        const data = await response.json();
        console.log(data.fetchedCourses)
        console.log(data.fetchedCourses[13].user)
        if (response.ok) {
          setCourses(data.fetchedCourses || []);
        } else {
          console.error("Error fetching courses:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = courses.slice(startIndex, startIndex + itemsPerPage);
  const featuredCourses = courses.slice(0, 3);
  const recentCourses = courses.slice(0, 4);

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-12 px-4 md:px-12 bg-gradient-to-b from-[#f0f4ff] to-white">
        <div className="mt-12"></div>

        {loading ? (
          <div className="text-center text-green-700 font-bold text-lg">Loading courses...</div>
        ) : (
          <>
            {/* Featured Courses */}
            <section>
              <h2 className="text-2xl font-bold text-center text-green-700">Featured Courses</h2>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {featuredCourses.map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))}
              </motion.div>
            </section>

            {/* Recently Published */}
            <section>
              <h2 className="text-2xl font-bold text-center text-green-700">Recently Published</h2>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {recentCourses.map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))}
              </motion.div>
            </section>

            {/* Explore Courses (With Pagination) */}
            <section>
              <h2 className="text-2xl font-bold text-center text-green-700">Explore Courses</h2>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {paginatedCourses.map((course, index) => (
                  <Link key={index} to={`/courses/details/${course._id}`}>
                  <CourseCard course={course} />
                  </Link>
                ))}
              </motion.div>

              {/* Pagination Controls */}
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Prev
                </button>

                <span className="text-green-700 font-semibold">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}
