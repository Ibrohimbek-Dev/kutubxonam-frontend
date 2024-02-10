import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import classNames from "classnames";

const SparkAnimation = ({ children, className }) => {
  const sparkControls = useAnimation();
  const [particles, setParticles] = useState([]);

  const createParticles = () => {
    const newParticles = Array.from({ length: 10 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);

    setTimeout(() => {
      setParticles([]);
    }, 1000);
  };

  const startSparkAnimation = async () => {
    await sparkControls.start({ opacity: 1, scale: 1.5 });
    await sparkControls.start({ opacity: 1, scale: 1 });
    createParticles();
  };
  

  return (
    <motion.div
      className={classNames("spark-animation", className)}
      // whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.05 }}
      animate={sparkControls}
      initial={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={startSparkAnimation}
      onClick={startSparkAnimation}
    >
      {children}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          style={{
            position: "absolute",
            top: `${particle.y}%`,
            left: `${particle.x}%`,
          }}
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1 }}
        >
          ✨
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SparkAnimation;
