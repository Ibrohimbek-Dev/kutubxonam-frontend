import React from "react";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

const SearchBar = () => {
  const [{ searchTerm }, dispatch] = useStateValue();

  const setSearchTerm = (value) => {
    dispatch({
      type: actionType.SET_SEARCH_TERM,
      searchTerm: value,
    });
  };

  const keyDownHandle = (e) => {
    if (e.key == "Enter") {
      handleSearchItem();
    }
  };

  const handleSearchItem = () => {
    if (searchTerm.length > 0) {
      dispatch({
        type: actionType.SET_SEARCH_ITEM,
        searchItem: true,
      });
    }
  };

  return (
    <input
      type="text"
      placeholder="Izlash..."
      className="outline-none tracking-wider xsm:tracking-normal xsm:text-xxsm mnsm:ml-2 md:text-lg w-full bg-transparent text-blue-950"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onClick={handleSearchItem}
      onKeyDown={keyDownHandle}
    />
  );
};

export default SearchBar;
