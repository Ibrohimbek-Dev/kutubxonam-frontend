import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import menuData from "../json/menuData.json";
import "../../css/scrollbar.css";

import { VscLayersActive, VscLayers } from "react-icons/vsc";
import { useStateValue } from "../../context/StateProvider";

const SidebarVer = ({ openSidebarVer }) => {
  const [subMenus, setSubMenus] = useState({});
  const [iconClicked, setIconClicked] = useState(false);
  const [{ allStories }, dispatch] = useStateValue();

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

  return (
    <motion.div
      className={`sidebar md:flex top-0 w-64 left-0 bg-slate-50 text-white shadow-lg overflow-hidden`}
      animate={{ x: openSidebarVer ? "0%" : "-100%" }}
      transition={{ type: "tween", duration: 0.5 }}
    >
      <div className="mt-24 scrollbar overflow-y-auto overflow-x-hidden">
        <motion.div className="flex justify-end">
          {!iconClicked ? (
            <VscLayersActive className="text-black text-2xl cursor-pointer mr-2 hover:scale-110 transition-all duration-500" />
          ) : (
            <VscLayers
              className="text-black text-2xl cursor-pointer mr-2 hover:scale-110 transition-all duration-500"
              onClick={closeSubMenu}
            />
          )}
        </motion.div>
        <nav className="pt-10 px-1">
          <ul className="pl-2">
            {menuData.map((menu, index) => (
              <li className="pb-4" key={index}>
                <motion.div
                  className="flex cursor-pointer font-medium items-center"
                  onClick={() => toggleSubMenu(menu.menuName)}
                >
                  <p className={`mr-1 text-black`}>{menu.menuName}</p>
                  {subMenus[menu.menuName] ? (
                    <IoMdArrowDropdown className="text-2xl text-black" />
                  ) : (
                    <IoMdArrowDropup className="text-2xl text-black" />
                  )}
                </motion.div>
                <AnimatePresence>
                  {subMenus[menu.menuName] && (
                    <motion.ul
                      className="pl-4 text-black"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {menu.subMenus.map((subMenu, subIndex) => (
                        <li
                          className="my-1 cursor-pointer px-1 text-black border hover:bg-gray-200 rounded-md"
                          key={subIndex}
                        >
                          {typeof subMenu === "object" &&
                          subIndex in subMenu &&
                          allStories?.length > 0
                            ? subMenu[subIndex] + ` (${allStories?.length})`
                            : subMenu + " (0)"}
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

export default SidebarVer;