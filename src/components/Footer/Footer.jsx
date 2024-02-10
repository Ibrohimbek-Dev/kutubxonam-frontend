import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-4 mt-4 text-center h-20 fixed w-screen">
      <div className="text-gray-600">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Audio Book Website
        </p>
        <p className="text-sm">All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
