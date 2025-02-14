import { useState } from "react";
import { motion } from "framer-motion";
import CourseCard from "./CourseCard";
import Navbar from "../Navbar";

const courses = [
    { title: "React Basics", desc: "Learn React from scratch", teacherName: "Alice", lectureTiming: "Mon 5 PM" },
    { title: "JavaScript Mastery", desc: "Deep dive into JS", teacherName: "Bob", lectureTiming: "Wed 6 PM" },
    { title: "CSS Animations", desc: "Make your UI awesome", teacherName: "Charlie", lectureTiming: "Fri 7 PM" },
    { title: "Node.js Essentials", desc: "Backend with Node.js", teacherName: "David", lectureTiming: "Sat 4 PM" },
    { title: "Fullstack Development", desc: "Build full-stack apps", teacherName: "Eve", lectureTiming: "Sun 2 PM" },
    { title: "UI/UX Fundamentals", desc: "Design with confidence", teacherName: "Frank", lectureTiming: "Tue 3 PM" },
    { title: "Python for Data Science", desc: "Learn NumPy & Pandas", teacherName: "Grace", lectureTiming: "Thu 4 PM" },
  ];


export default function CourseList() {
  const featuredCourses = courses.slice(0, 3); // First 3 courses as featured
  const recentCourses = courses.slice(0, 4); // First 4 courses as recently published

  // Pagination state for Explore Courses
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = courses.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
    
    <Navbar/>
    <div className="flex flex-col space-y-12 px-4 md:px-12">
        <div className="mt-12"></div>
      
      {/* Featured Courses */}
      <section>
        <h2 className="text-2xl font-bold text-center text-black">Featured Courses</h2>
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
        <h2 className="text-2xl font-bold text-center text-black">Recently Published</h2>
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
        <h2 className="text-2xl font-bold text-center text-black">Explore Courses</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {paginatedCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </motion.div>

        {/* Pagination Controls */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          <span className="text-black font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </section>
      
    </div>
    
    </>

  );
}
