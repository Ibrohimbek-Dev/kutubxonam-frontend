import React, { useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaDesktop, FaMobileAlt, FaCog, FaBell } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import { AiOutlineLogin } from "react-icons/ai";
import UserInfo from "../UserData/UserInfo";
import { useSidebar } from "../../context/SidebarProvider";

const NavLinks = () => {
  const [{ user }, dispatch] = useStateValue();
  const { setLoginOptions, setOpenMenu} = useSidebar();

  const toggleFunc = () => {
    setLoginOptions((prev) => !prev);
    setOpenMenu(false);
  };

  return (
    <>
      <div className="flex nav-links md:items-center z-50 flex-col md:flex-row md:space-x-2">
        <div className="flex md:flex-row md:space-x-4 flex-col space-y-2 md:space-y-0">
          <NavLink to="/download-desktop">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex justify-center items-center cursor-pointer transform transition duration-300 hover:scale-110"
            >
              <p className="mr-2 md:hidden text-xxsm sm:text-base font-bold text-center text-gray-800">
                Kompyuter uchun
              </p>
              <FaDesktop className="cursor-pointer md:text-2xl xsm:hidden text-black md:text-white" />
            </motion.div>
          </NavLink>
          <NavLink to="/download-mobile">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex justify-center items-center cursor-pointer transform transition duration-300 hover:scale-110"
            >
              <p className="mr-2 md:hidden text-xxsm sm:text-base font-bold text-center text-gray-800">
                Telefon uchun
              </p>
              <FaMobileAlt className="cursor-pointer md:text-2xl xsm:hidden text-black md:text-white" />
            </motion.div>
          </NavLink>
          <NavLink to={"/settings"}>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex justify-center items-center cursor-pointer transform transition duration-300 hover:scale-110"
            >
              <p className="mr-2 md:hidden text-xxsm sm:text-base font-bold text-center text-gray-800">
                Sozlamalar
              </p>
              <FaCog className="cursor-pointer md:text-2xl xsm:hidden text-black md:text-white" />
            </motion.div>
          </NavLink>

          <NavLink to={"/alerts"}>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex justify-center items-center cursor-pointer transform transition duration-300 hover:scale-110"
            >
              <p className="mr-2 md:hidden text-xxsm sm:text-base font-bold text-center text-gray-800">
                Yangliklar
              </p>
              <FaBell className="cursor-pointer md:text-2xl xsm:hidden text-black md:text-white" />
            </motion.div>
          </NavLink>

          {user?.user?.role === "admin" && (
            <NavLink to={"/upload"}>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="flex justify-center items-center cursor-pointer transform transition duration-300 hover:scale-110"
              >
                <p className="mr-2 md:hidden text-xxsm sm:text-base font-bold text-center text-gray-800">
                  Yuklang
                </p>
                <IoMdCloudUpload className="cursor-pointer md:text-2xl xsm:hidden text-black md:text-white" />
              </motion.div>
            </NavLink>
          )}
        </div>

        <div className="mt-2 md:mt-0 flex justify-center">
          {!user ? (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex justify-center items-center cursor-pointer transform transition duration-300 hover:scale-110"
              onClick={toggleFunc}
            >
              <p className="mr-2 md:hidden text-xxsm sm:text-base font-bold text-center text-gray-800">
                A'zo bo'ling
              </p>
              <AiOutlineLogin className="cursor-pointer md:text-2xl xsm:hidden text-black md:text-white" />
            </motion.div>
          ) : (
            <motion.div className="flex justify-center items-center cursor-pointer transform transition duration-300 hover:scale-100">
              <UserInfo />
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavLinks;
