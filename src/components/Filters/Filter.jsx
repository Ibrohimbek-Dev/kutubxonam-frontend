import React from "react";
import FilterButtons from "./FilterButtons";

const Filter = () => {
  const searchData = [
    {
      type: "book",
      value: "Book",
    },
    {
      type: "author",
      value: "Author",
    },
  ];
  return (
    <div className="">
      <FilterButtons filterData={searchData} flag={"Book"} />
    </div>
  );
};

export default Filter;

