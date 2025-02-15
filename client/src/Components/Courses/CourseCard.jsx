import { motion } from "framer-motion";

export default function CourseCard({ course }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(0, 255, 0, 0.6)" }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md p-6 bg-white rounded-lg shadow-lg border border-gray-300 relative overflow-hidden group"
    >
      {/* Glowing border effect */}
      <div className="absolute inset-0 border-2 border-transparent rounded-lg group-hover:border-green-500 transition-all duration-300"></div>

      <h2 className="text-xl font-bold text-green-700">{course.title}</h2>
      <p className="text-green-600 mt-2">{course.desc}</p>
      
      <div className="mt-4">
        <p className="text-sm text-green-700 font-semibold">Instructor: {course.teacherName}</p>
        <p className="text-sm text-green-500">Lecture Timing: {course.lectureTiming}</p>
      </div>
    </motion.div>
  );
}
