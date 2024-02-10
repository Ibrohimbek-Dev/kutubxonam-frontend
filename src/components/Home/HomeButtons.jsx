import React, { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { motion } from "framer-motion";
import SparkAnimation from "../Effects/SparkAnimation";

const HomeButtons = ({ textName, moveSliderRight, moveSliderLeft }) => {
  const [colorRight, setColorRight] = useState(false);
  const [colorLeft, setColorLeft] = useState(false);

  return (
    <motion.div className="flex w-64 bg-transparent p-1 h-full rounded-xl overflow-hidden flex-col border border-gray-300 xsm:w-40 items-center justify-center space-y-4">
      <motion.div whileHover={{ scale: 1.2 }} className="overflow-hidden p-1">
        <SparkAnimation className="text-lime-700">
          <AiFillLike className="text-5xl xsm:hidden cursor-pointer" />
        </SparkAnimation>
      </motion.div>

      <motion.div className="flex text-center items-center flex-col justify-center">
        <h1 className="text-2xl font-bold">{textName}</h1>
        <p className="text-gray-600 xsm:text-xxsm text-sm">
          Be'pul elektron kitoblar
        </p>
      </motion.div>

      <motion.div className="flex xsm:border-none rounded-2xl xsm:py-0 py-1 w-full justify-around">
        <motion.button
          whileTap={{ scale: 1.1, transition: { duration: 0.1 } }}
          className={`${
            colorLeft ? "bg-lime-900" : "bg-lime-500"
          } duration-100 transition-all ease-in-out text-white rounded-full xsm:p-0 p-2`}
          onClick={() => {
            setColorLeft(true);
            setTimeout(() => {
              setColorLeft(false);
            }, 200);
            moveSliderLeft();
          }}
        >
          <FaArrowAltCircleLeft className="xsm:text-lg text-4xl" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 1.1 }} // Scale up when hovered
          className={`${
            colorRight ? "bg-lime-900" : "bg-lime-500"
          } duration-100 transition-all ease-in-out text-white rounded-full xsm:p-0 p-2`}
          onClick={() => {
            setColorRight(true);
            setTimeout(() => {
              setColorRight(false);
            }, 200);
            moveSliderRight();
          }}
        >
          <FaArrowAltCircleRight className="xsm:text-lg text-4xl" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default HomeButtons;
