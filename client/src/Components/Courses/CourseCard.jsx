import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md p-6 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-xl shadow-lg border border-gray-300 relative overflow-hidden group transform transition-all"
    >
      {/* Course Image */}
      <div className="relative overflow-hidden rounded-lg">
        {course.imageLink && (
          <motion.img
            src={course.imageLink}
            alt={course.title}
            className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {/* Image Overlay Effect */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300"></div>
      </div>

      {/* Course Title */}
      <h2 className="text-2xl font-extrabold text-gray-900 mt-4">{course.title}</h2>
      <p className="text-gray-700 mt-2 text-sm leading-relaxed">{course.desc}</p>

      {/* Course Details */}
      <div className="mt-4 text-sm">
        <p className="text-gray-900 font-semibold">
          Instructor: <span className="text-[#0F6B5E]">{course.user?.username}</span>
        </p>
        <p className="text-gray-600">Lecture Timing: {course.lectureTiming}</p>
      </div>

      {/* Button */}
      <Link to={`/courses/view/${course._id}`}>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-full py-3 text-white font-semibold bg-[#0F6B5E] rounded-lg shadow-md hover:bg-[#0a4e42] transition-all transform hover:-translate-y-1"
        >
          View Course
        </motion.button>
      </Link>
    </motion.div>
  );
}
