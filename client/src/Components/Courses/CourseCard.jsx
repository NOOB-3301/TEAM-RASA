import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)",
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md p-6 bg-white rounded-lg shadow-md border border-gray-300 relative overflow-hidden group"
    >
      {/* Course Image */}
      {course.imageLink && (
        <motion.img
          src={course.imageLink}
          alt={course.title}
          className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
          whileHover={{ scale: 1.02 }}
        />
      )}

      {/* Course Title */}
      <h2 className="text-xl font-bold text-gray-900">{course.title}</h2>
      <p className="text-gray-600 mt-2">{course.desc}</p>

      {/* Course Details */}
      <div className="mt-4">
        <p className="text-sm text-gray-900 font-semibold">
          Instructor: {course.user?.username}
        </p>
        <p className="text-sm text-gray-600">
          Lecture Timing: {course.lectureTiming}
        </p>
      </div>

      {/* Button */}
      <Link to={`/courses/view/${course._id}`}>
        <button className="mt-4 px-4 py-2 text-white bg-[#0F6B5E] rounded-lg hover:bg-[#0a4e42] transition-all cursor-pointer">
          View Course
        </button>
      </Link>
    </motion.div>
  );
}
