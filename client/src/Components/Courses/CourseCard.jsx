import { motion } from "framer-motion";

export default function CourseCard({ course }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)" }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md p-6 bg-gray-100 rounded-lg shadow-md border border-gray-300 relative overflow-hidden group"
    >
      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent rounded-lg group-hover:border-gray-400 transition-all duration-300"></div>

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
      <p className="text-gray-700 mt-2">{course.desc}</p>
      
      {/* Course Details */}
      <div className="mt-4">
        <p className="text-sm text-gray-800 font-semibold">Instructor: {course.user?.username}</p>
        <p className="text-sm text-gray-600">Lecture Timing: {course.lectureTiming}</p>
      </div>
    </motion.div>
  );
}
