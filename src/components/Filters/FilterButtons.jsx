import React, { useEffect, useRef, useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { IoChevronDown } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "../../hooks/hooksFuncs";

const FilterButtons = ({ filterData, flag }) => {
  const [filterName, setFilterName] = useState(flag);
  const [filterMenu, setFilterMenu] = useState(false);
  const [{ searchBy }, dispatch] = useStateValue();
  const filterRef = useRef(null);

  const updateFilterButton = (name) => {
    setFilterName(name);
    setFilterMenu(false);

    dispatch({
      type: actionType.SET_SEARCH_BY,
      searchBy: filterName,
    });
  };

  useEffect(() => {
    dispatch({
      type: actionType.SET_SEARCH_BY,
      searchBy: filterName,
    });
  }, [filterName]);

  useClickOutside(filterRef, () => {
    setFilterMenu(false);
  });

  return (
    <div
      onClick={() => setFilterMenu(!filterMenu)}
      className="border border-gray-300 rounded-md px-4 relative cursor-pointer py-1 hover:border-gray-400"
    >
      <p className="text-base tracking-wide text-textColor font-semibold flex items-center gap-1">
        {searchBy}

        <IoChevronDown
          className={`text-base text-textColor duration-150 transition-all ease-in-out ${
            filterMenu ? "rotate-180" : "rotate-0"
          }`}
        />
      </p>

      {filterMenu && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="w-28 z-50 px-1 text-[#7BA05B] font-medium bg-card backdrop-blur-sm overflow-hidden py-1 rounded-md shadow-md absolute top-9 left-0 hover:bg-gray-200"
            ref={filterRef}
            onMouseEnter={() => setFilterMenu(true)}
            onMouseLeave={() => {
              setTimeout(() => setFilterMenu(false), 4000);
            }}
          >
            {filterData?.map((data) => (
              <p
                onClick={() => updateFilterButton(data.value)}
                className="hover:underline hover:scale-105 hover:translate-x-1 font-medium text-base transition-all duration-400 ease-in  hover:text-green-800 rounded-md"
              >
                {data.value}
              </p>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default FilterButtons;
