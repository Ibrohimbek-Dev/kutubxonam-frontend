import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import React, { useEffect, useRef } from "react";
import { useSidebar } from "../../context/SidebarProvider";
import { useClickOutside, useResizeMin768px } from "../../hooks/hooksFuncs";

const LoginOptions = () => {
  const { openLoginOption, setLoginOptions } = useSidebar();
  const loginOptionsRef = useRef(null);
  const isSmallScreen = () => window.innerWidth <= 768;

  useResizeMin768px(setLoginOptions);

  useClickOutside(loginOptionsRef, () => {
    setLoginOptions(false);
  });

  return (
    <>
      {openLoginOption && !isSmallScreen() ? (
        <motion.div
          animate={{ y: openLoginOption ? "30%" : "-100%" }}
          transition={{ type: "tween", duration: 0.5 }}
          className={`shadow-lg z-50 fixed top-0 right-0 text-black overflow-hidden transition-all duration-500`}
          ref={loginOptionsRef}
        >
          <div
            className="text-black w-64 xsm:w-32 mt-2 border-black p-4 bg-white"
            onMouseEnter={() => setLoginOptions(true)}
            onMouseLeave={() => {
              setTimeout(() => setLoginOptions(false), 2000);
            }}
          >
            <h2 className="text-sm md:text-xl mb-1 font-semibold md:mb-4 text-center">
              A'zo bo'lish
            </h2>
            <div className="flex flex-col space-y-4">
              <NavLink
                to={"/google-login"}
                className="flex py-1 items-center justify-center space-x-3 bg-blue-500 hover:bg-blue-700 text-white md:font-bold font-light md:py-2 px-4 rounded"
              >
                <FaGoogle className="flex xsm:hidden" />
                <p className="text-xs md:text-base">Google orqalik</p>
              </NavLink>
              <NavLink
                to={"/google-login"}
                className="flex py-1 items-center justify-center space-x-3 bg-orange-500 hover:bg-orange-700 text-white md:font-bold font-light md:py-2 px-4 rounded"
              >
                <MdOutlineMail className="flex xsm:hidden" />
                <p className="text-xs md:text-base">Email orqalik</p>
              </NavLink>
              <NavLink
                to={"/google-login"}
                className="flex py-1 items-center justify-center space-x-3 bg-lime-500 hover:bg-lime-700 text-white md:font-bold font-light md:py-2 px-4 rounded"
              >
                <FaPhoneAlt className="flex xsm:hidden" />
                <p className="text-xs md:text-base">Telefon orqalik</p>
              </NavLink>
            </div>
          </div>
        </motion.div>
      ) : (
        isSmallScreen() &&
        openLoginOption && (
          <motion.div
            animate={{ z: openLoginOption ? "0%" : "-100%" }}
            transition={{ type: "tween", duration: 0.5 }}
            className={`absolute z-50 w-full items-center flex-col h-full flex justify-center`}
          >
            <div className="absolute -z-50 inset-0 bg-black opacity-50"></div>
            <div
              className="text-black w-72 xsm:w-32 mt-2 p-4 bg-white"
              onMouseEnter={() => setLoginOptions(true)}
              onMouseLeave={() => {
                setTimeout(() => setLoginOptions(false), 2000);
              }}
              ref={loginOptionsRef}
            >
              <h2 className="text-sm md:text-xl mb-1 font-semibold md:mb-4 text-center">
                A'zo bo'lish
              </h2>
              <div className="flex flex-col space-y-4">
                <NavLink
                  to={"/google-login"}
                  className="flex py-1 items-center justify-center space-x-3 bg-blue-500 hover:bg-blue-700 text-white md:font-bold font-light md:py-2 px-4 rounded"
                >
                  <FaGoogle className="flex xsm:hidden" />
                  <p className="text-xs md:text-base">Google orqalik</p>
                </NavLink>
                <NavLink
                  to={"/email-login"}
                  className="flex py-1 items-center justify-center space-x-3 bg-orange-500 hover:bg-orange-700 text-white md:font-bold font-light md:py-2 px-4 rounded"
                >
                  <MdOutlineMail className="flex xsm:hidden" />
                  <p className="text-xs md:text-base">Email orqalik</p>
                </NavLink>
                <NavLink
                  to={"/phone-login"}
                  className="flex py-1 items-center justify-center space-x-3 bg-lime-500 hover:bg-lime-700 text-white md:font-bold font-light md:py-2 px-4 rounded"
                >
                  <FaPhoneAlt className="flex xsm:hidden" />
                  <p className="text-xs md:text-base">Telefon orqalik</p>
                </NavLink>
              </div>
            </div>
          </motion.div>
        )
      )}
    </>
  );
};

export default LoginOptions;
