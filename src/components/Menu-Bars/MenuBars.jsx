import { motion } from "framer-motion";
import NavLinks from "../Navbar/NavLinks";
import { useClickOutside } from "../../hooks/hooksFuncs";
import { useRef } from "react";

const OpenMenuBar = ({ openMenu, setOpenMenu }) => {
  const menuOptionsRef = useRef(null);
  useClickOutside(menuOptionsRef, () => {
    setOpenMenu(false)
  })

  return (
    <motion.div      
      animate={{ x: openMenu ? "0%" : "100%"}}
      transition={{ type: "tween", duration: 0.5 }}
      className={`h-3/5 fixed right-0 bg-white text-black ${
        openMenu ? "w-64 xsm:w-32 p-4 shadow-lg" : "w-0"
      } overflow-hidden transition-all duration-500 z-40`}
      ref={menuOptionsRef}
    >
      {openMenu && (
        <div className="text-black mt-16">
          <NavLinks />               
        </div>
      )}
    </motion.div>
  );
};

export default OpenMenuBar;
