import React from "react";

const Loader = () => {
  return (
    <div className="flex fixed top-0 left-0 w-full h-full items-center justify-center bg-loaderOverlay">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-lime-500"></div>
    </div>
  );
};

export default Loader;
