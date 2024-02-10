import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useEffect } from "react";

const FadeInSpan = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.span
          className="text-xl text-cartBg font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {text?.length > 20 ? text?.slice(0, 20) + "..." : text}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default FadeInSpan;
