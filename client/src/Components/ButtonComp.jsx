import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";

export default function AnimatedButton({
  text,
  onClick,
  variant = "primary",
  icon: Icon,
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        scale: 1.1,
        boxShadow:
          variant === "primary"
            ? "0px 0px 20px rgba(68, 188, 255, 0.8)"
            : "0px 0px 20px rgba(255, 68, 236, 0.8)",
      }}
      whileTap={{ scale: 0.95 }}
      className={`relative flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-lg overflow-hidden transition-all ${
        variant === "primary"
          ? "bg-blue-600 text-white"
          : "border border-black text-black"
      }`}
    >
      {/* Animated Gradient
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] opacity-30"
      /> */}
      
      {/* Button Text & Icon */}
      {text} {Icon ? <Icon /> : variant === "primary" ? <FaArrowRight /> : <MdOutlineExplore />}
    </motion.button>
  );
}
