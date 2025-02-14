import { useState, useEffect } from "react";
import { FaArrowRight, FaChalkboardTeacher, FaUsers, FaBook, FaGlobe, FaHandsHelping } from "react-icons/fa";
import { motion } from "framer-motion";
import AnimatedButton from "../ButtonComp";
import Navbar from "../Navbar";

const words = ["Education", "Learning", "Opportunities", "Communities", "Futures"];

export default function LandingPage() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  useEffect(() => {
    setText(words[index].substring(0, subIndex));
  }, [subIndex, index]);

  return (
    <>
    <div className="overflow-x-hidden bg-gray-50 min-h-screen flex flex-col items-center">      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center h-screen justify-center max-w-3xl px-6">
        <motion.h1 
          className="text-7xl sm:text-8xl font-extrabold text-gray-900 drop-shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          RASA
        </motion.h1>
        <div className="flex flex-col items-center mt-4">
          <span className="text-xl sm:text-2xl font-semibold text-gray-600">Empowering Local Teachers, Transforming</span>
          <motion.span 
            className="relative inline-block w-fit text-3xl sm:text-4xl font-bold text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="absolute inset-0 w-full bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg opacity-50"></span>
            <span className="relative">{text}</span>
          </motion.span>
        </div>
        {/* Buttons */}
        <div className="mt-8 flex justify-center space-x-6">
          <AnimatedButton text="Get Started" onClick={() => window.location.href = "/signup"} variant="primary" />
          <AnimatedButton text="Explore Courses" onClick={() => window.location.href = "/courses"} variant="secondary" />
        </div>
      </section>

      {/* About Us Section */}
      <section className="mt-32 text-center px-6 max-w-4xl">
        <h2 className="text-5xl font-bold text-gray-900">About Us</h2>
        <p className="mt-6 text-xl text-gray-700 leading-relaxed">
          RASA is dedicated to connecting local educators with students, providing quality educational resources, and fostering a strong learning community. Our mission is to make education accessible and impactful for everyone.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="mt-32 text-center px-6 max-w-5xl">
        <h2 className="text-5xl font-bold text-gray-900">Why Choose Us?</h2>
        <p className="mt-6 text-xl text-gray-700">
          We provide high-quality learning experiences tailored to local needs, ensuring every student gets the best education possible.
        </p>

        {/* Features Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-12">
          {[{
            icon: <FaChalkboardTeacher className="text-6xl text-blue-500" />, 
            title: "Expert Teachers", 
            desc: "Learn from certified and experienced educators."
          }, {
            icon: <FaUsers className="text-6xl text-purple-500" />, 
            title: "Community Support", 
            desc: "Join a growing network of passionate learners."
          }, {
            icon: <FaBook className="text-6xl text-red-500" />, 
            title: "Quality Content", 
            desc: "Access well-structured courses and materials."
          }, {
            icon: <FaGlobe className="text-6xl text-green-500" />, 
            title: "Global Reach", 
            desc: "Connect with educators and learners worldwide."
          }, {
            icon: <FaHandsHelping className="text-6xl text-orange-500" />, 
            title: "Mentorship Programs", 
            desc: "Get guidance from experienced professionals."
          }].map(({ icon, title, desc }, idx) => (
            <motion.div 
              key={idx} 
              className="flex flex-col items-center p-8 bg-white shadow-xl rounded-2xl border border-gray-200"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              whileHover={{ scale: 1.1 }}
            >
              {icon}
              <h3 className="mt-6 text-2xl font-semibold text-gray-900">{title}</h3>
              <p className="text-lg text-gray-600 mt-3 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
    </>
  );
}
