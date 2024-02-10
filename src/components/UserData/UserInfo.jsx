import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { useResizeMin768px } from "../../hooks/hooksFuncs";
import { app } from "../../config/firebase.config";
import "firebase/auth";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { actionType } from "../../context/reducer";
import { validateUser } from "../../api/user-api";

const UserInfo = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const logOut = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((e) => console.log(e));
    navigate("/home", { replace: true });
  };
  useResizeMin768px(setIsMenuOpen);

  const signWithAnotherAccount = async () => {
    try {
      await signInWithRedirect(firebaseAuth, provider);
      navigate("/home", { replace: true });
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <div className="flex relative flex-col gap-2 items-center ml-auto cursor-pointer">
      <motion.img
        src={user?.user?.imageURL}
        className="w-6 min-w-[44px] object-cover rounded-full shadow-lg"
        alt=""
        referrerPolicy="no-referrer"
        whileHover={{ scale: 1.1 }}
        onMouseEnter={() => setIsMenuOpen(true)}
      />

      {isMenuOpen && (
        <motion.div
          // initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="top-12 md:absolute z-10 p-4 right-0 rounded-lg border-2 shadow-lg backdrop-blur-sm bg-card"
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => {
            setTimeout(() => setIsMenuOpen(false), 1500);
          }}
        >
          <div className="w-40">
            <NavLink to={"/profile"}>
              <p className="text-base transition duration-700 ease-in-out text-textColor hover:underline hover:scale-105">
                {user?.user?.name}
              </p>
            </NavLink>

            <NavLink to={"/favorites"}>
              <p className="text-base transition duration-700 ease-in-out text-textColor hover:underline hover:scale-105">
                My Favorites
              </p>
            </NavLink>
            <hr />

            {user?.user?.role === "admin" && (
              <NavLink to={"/dashboard/home"}>
                <p className="text-base transition duration-700 ease-in-out text-textColor hover:underline hover:scale-105">
                  Dashboard
                </p>
              </NavLink>
            )}

            <p
              className="text-base transition duration-700 ease-in-out text-textColor hover:underline hover:scale-105"
              onClick={logOut}
            >
              Sign out
            </p>
            <p
              className="text-base transition duration-700 ease-in-out text-textColor hover:underline hover:scale-105"
              onClick={signWithAnotherAccount}
            >
              Add another account
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UserInfo;
