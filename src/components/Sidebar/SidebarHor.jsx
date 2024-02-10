import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import menuData from "../json/menuData.json";
import "../../css/scrollbar.css";
import { VscLayersActive, VscLayers } from "react-icons/vsc";
import { useClickOutside } from "../../hooks/hooksFuncs";

const SidebarHor = ({ openSidebarHor }) => {
  const [subMenus, setSubMenus] = useState({});
  const [iconClicked, setIconClicked] = useState(false);
  const menuSideOptionsRef = useRef(null);

  const toggleSubMenu = (menu) => {
    setSubMenus((prevSubMenus) => ({
      ...prevSubMenus,
      [menu]: !prevSubMenus[menu],
    }));
    setIconClicked(true);
  };

  const closeSubMenu = () => {
    setSubMenus({});
    setIconClicked(false);
  };

  useClickOutside(menuSideOptionsRef, () => {    
    setSubMenus({});
  });

  return (
    <motion.div
      className={`sidebar scrollbarSidebar  md:hidden z-40 fixed top-0 left-0 w-full bg-slate-50 text-white shadow-lg`}
      initial={{ y: "-100%" }}
      animate={{ y: openSidebarHor ? "0%" : "-100%" }}
      transition={{ type: "tween", duration: 0.5 }}
      ref={menuSideOptionsRef}
    >
      <div className="xsm:mt-12 p-1 mt-16 sm:mt-20 h-full">
        <motion.div className="flex justify-end">
          {!iconClicked ? (
            <VscLayersActive className="text-black text-md sm:text-2xl cursor-pointer mr-2 hover:scale-110 transition-all duration-500" />
          ) : (
            <VscLayers
              className="text-black text-md sm:text-2xl cursor-pointer mr-2 hover:scale-110 transition-all duration-500"
              onClick={closeSubMenu}
            />
          )}
        </motion.div>
        <nav className="pt-2 h-auto">
          <ul className="mnsm:pl-2 xsm:grid-cols-1 mnsm:grid-cols-2 grid gap-2">
            {menuData.map((menu, index) => (
              <li className="" key={index}>
                <motion.div
                  className="flex cursor-pointer justify-center font-medium items-start"
                  onClick={() => toggleSubMenu(menu.menuName)}
                >
                  <p
                    className={`text-black text-sm underline decoration-dotted sm:text-base`}
                  >
                    {menu.menuName}
                  </p>
                  {subMenus[menu.menuName] ? (
                    <IoMdArrowDropdown className="text-2xl text-black" />
                  ) : (
                    <IoMdArrowDropup className="text-2xl text-black" />
                  )}
                </motion.div>
                <AnimatePresence>
                  {subMenus[menu.menuName] && (
                    <motion.ul
                      className="text-black flex flex-col"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {menu.subMenus.map((subMenu, subIndex) => (
                        <li
                          className="my-1 text-right cursor-pointer px-1 text-black border hover:bg-gray-200 rounded-md"
                          key={subIndex}
                        >
                          {subMenu}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.div>
  );
};

export default SidebarHor;

// Bu qismdan yuqoridan tushgan menu bar atrofi bosilganda yopiladigon qilishim kerak
