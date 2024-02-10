import { useEffect } from "react";

export const useClickOutside = (ref, callback) => {
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    const handleClick = (event) => {
      handleClickOutside(event);
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback, handleClickOutside]);
};

export const useResizeMin768px = (...args) => {
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      args.forEach((arg) => {
        if (windowWidth >= 768 && typeof arg === "function") {
          arg(false);
        }
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [...args]);
};

export const useResizeMax767px = (...args) => {
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      args.forEach((arg) => {
        if (windowWidth <= 768 && typeof arg === "function") {
          arg(false);
        }
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [...args]);
};
