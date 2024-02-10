import React, { useState, useEffect } from "react";
import Logo from "./logo_bg.png";
import { RiMenuFoldLine, RiMenuUnfoldFill } from "react-icons/ri";
import { motion } from "framer-motion";
import OpenMenuBar from "../Menu-Bars/MenuBars";
import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Filter from "../Filters/Filter";
import { useSidebar } from "../../context/SidebarProvider";
import { IoCloseSharp } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";
import NavLinks from "./NavLinks";
import LoginOptions from "../Login/LoginOptions";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import SidebarHor from "../Sidebar/SidebarHor";
import { TbCategoryPlus } from "react-icons/tb";
import { useResizeMin768px, useResizeMax767px } from "../../hooks/hooksFuncs";
import { IoSearch } from "react-icons/io5";
import { getAllStories } from "../../api/story-api";
import SparkAnimation from "../Effects/SparkAnimation";

const Navbar = () => {
  const [{ searchTerm, allStories, user }, dispatch] = useStateValue();

  const [isSparkling, setIsSparkling] = useState(false);
  const [isOpenSidebarHor, setIsOpenSidebarHor] = useState(false);
  const {
    openSidebar,
    setOpenSidebar,
    openLoginOption,
    openMenu,
    setOpenMenu,
    setClick,
    click,
  } = useSidebar();

  const sideBarClick = () => {
    setIsSparkling(true);
    setOpenSidebar((toggle) => !toggle);
    setTimeout(() => setIsSparkling(false), 500);
  };

  const location = useLocation();
  const path = location.pathname.startsWith("/dashboard/");

  useResizeMin768px(setOpenMenu, setIsOpenSidebarHor);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth >= 768) {
  //       setOpenMenu(false);
  //       setIsOpenSidebarHor(false);
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const toggleSidebarHor = () => {
    setIsOpenSidebarHor((prev) => !prev);
  };

  const toggleMenuBar = () => {
    setOpenMenu((prev) => !prev);
    setIsOpenSidebarHor(false);
  };

  useEffect(() => {
    if (!allStories) {
      getAllStories().then((data) => {
        if (data) {
          dispatch({
            type: actionType.SET_ALL_STORIES,
            allStories: data.data,
          });
        }
      });
    }
  }, [allStories]);

  const handleSearchItem = () => {
    setClick(true);
    setTimeout(() => {
      setClick(false);
    }, 100);

    if (searchTerm.length > 0) {
      dispatch({
        type: actionType.SET_SEARCH_ITEM,
        searchItem: true,
      });
    }
  };

  useEffect(() => {
    if (!searchTerm.length > 0) {
      dispatch({
        type: actionType.SET_SEARCH_ITEM,
        searchItem: false,
      });
    }
  }, [searchTerm]);

  const handleClearTerm = () => {
    dispatch({
      type: actionType.SET_SEARCH_TERM,
      searchTerm: "",
    });
  };

  return (
    <>
      <nav className="bg-[#7BA05B] navbar top-0 shadow-lg fixed w-full p-2 flex justify-between items-center text-white z-50">
        <div className="flex items-center space-x-4">
          <div className="flex items-start sm:space-x-3">
            <motion.div
              whileTap={{ scale: 0.9 }}
              onClick={sideBarClick}
              className="hidden md:flex"
            >
              {openSidebar ? (
                <RiMenuUnfoldFill
                  size={28}
                  color="#FFEFD5"
                  className={`${
                    path && "hidden"
                  } cursor-pointer text-xl md:text-2xl lg:text-3xl xl:text-4xl`}
                />
              ) : (
                <RiMenuFoldLine
                  size={28}
                  color="#FFEFD5"
                  className={`${
                    path && "hidden"
                  } cursor-pointer text-xl md:text-2xl lg:text-3xl xl:text-4xl`}
                />
              )}
              {isSparkling && (
                <motion.div
                  initial={{ opacity: 1, scale: 0 }}
                  animate={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 1 }}
                  style={{
                    position: "absolute",
                    top: "- 10px",
                    left: "-10px",
                    fontSize: "28px",
                    color: "#fff",
                  }}
                >
                  <span>✨</span>
                </motion.div>
              )}
            </motion.div>

            <NavLink to="/home">
              <div className="flex flex-col items-start xsm:flex-row xsm:items-center">
                <img src={Logo} alt="logo" className="h-8 lg:h-10 xsm:h-4" />

                <h1 className="md:text-lg font-bold hidden sm:flex text-sm">
                  KUTUBXONAM
                </h1>
              </div>
            </NavLink>
          </div>
        </div>

        {/* Search Bar */}
        <div className="justify-start sm:m-2 sm:flex w-3/5">
          <div className=" hidden md:flex mr-1">
            <Filter />
          </div>
          <div className="flex items-center bg-white xsm:px-1 xsm:py-0 mnsm:px-2 mnsm:py-1 rounded-lg w-full">
            <motion.div
              whileTap={{ scale: 1.1 }}
              className={`${
                click ? "scale-110" : "scale-100"
              } cursor-pointer transform transition-all ease-linear sxm:text-xxsm text-sm md:text-2xl text-gray-400`}
              whileHover={{ color: "#000" }}
              onClick={handleSearchItem}
            >
              <IoSearch className="text-[#7BA05B]" />
            </motion.div>

            <SearchBar />

            <motion.div
              whileTap={{ scale: 1.1 }}
              className={`${
                click ? "scale-110" : "scale-100"
              } cursor-pointer transform transition-all ease-linear sxm:text-xxsm text-sm md:text-2xl text-gray-400`}
              whileHover={{ color: "#000" }}
              onClick={handleClearTerm}
            >
              <IoCloseSharp />
            </motion.div>
          </div>
        </div>

        <div className="md:hidden">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`border xsm:p-[2px] cursor-pointer text-xs p-1 bg-transparent rounded-md ${
              isOpenSidebarHor && "bg-green-300 border-none text-black"
            }`}
            onClick={toggleSidebarHor}
          >
            <TbCategoryPlus />
          </motion.div>
        </div>

        {/* Icons on the Right */}
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-2">
            <NavLinks />
          </div>
          <div className="md:hidden flex" onClick={toggleMenuBar}>
            {openMenu ? (
              <IoCloseSharp className="cursor-pointer text-lg" />
            ) : (
              <CiMenuFries className="cursor-pointer text-lg" />
            )}
          </div>
        </div>
      </nav>
      <div className="md:hidden">
        <OpenMenuBar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </div>

      <div>{openLoginOption && <LoginOptions />}</div>

      <div>
        <SidebarHor openSidebarHor={isOpenSidebarHor} />
      </div>
    </>
  );
};

export default Navbar;
