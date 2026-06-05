import React from "react";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

const Loader = ({
  size = 36,
  color = "#facc15",
  icon: Icon = FaSpinner,
  title = "MyMoviesHub",
  subtitle = "Movie Browser",
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      
      {/* Spinner */}
      <motion.div
        initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
        animate={{
          rotate: 360,
          scale: [0.8, 1.05, 0.8],
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ color }}
      >
        <Icon size={size} />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-white text-sm font-semibold tracking-wide"
      >
        {title}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="text-gray-400 text-xs tracking-wider"
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

export default Loader;