import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Navbar";

export default function CourseDetails() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/course/getcoursedetails", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ c_id: id }),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log(data)
                    setCourse(data.fetchedCourse);
                } else {
                    setError(data.message || "Failed to fetch course details.");
                }
            } catch (error) {
                setError("Network error. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [id]);

    if (loading) return <div className="text-center mt-10 text-lg font-semibold text-green-700">Loading course details...</div>;
    if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

    return (
        <>
            <div className="min-h-screen overflow-auto bg-gradient-to-b from-[#c6e0ff] via-[#f0f4ff] to-white flex flex-col items-center">
                <Navbar />
                <div className="mt-28"></div>
                <motion.div
                    className="w-full max-w-5xl mx-auto flex-1 p-8 bg-white shadow-lg rounded-lg mb-10"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >

                    {/* Course Image */}
                    {course.imageLink && (
                        <motion.img
                            src={course.imageLink}
                            alt={course.title}
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        />
                    )}

                    {/* Course Title */}
                    <motion.h1
                        className="text-3xl font-bold text-green-700 mt-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {course?.title}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        className="text-gray-700 mt-2 text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        {course.description}
                    </motion.p>

                    {/* Course Details */}
                    <motion.div
                        className="mt-6 space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <p className="text-lg"><strong>👨‍🏫 Teacher:</strong> {course.user?.username || "Unknown"}</p>
                        <p className="text-lg"><strong>🕒 Lecture Timing:</strong> {course.lectureTiming}</p>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}
