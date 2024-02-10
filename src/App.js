import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Dashboard, GoogleAuth, Home, Loader } from "./components";
import { motion, AnimatePresence } from "framer-motion";
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";
import { getAllFavourites } from "./api/favourite-api";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
import { getAllUsers, validateUser } from "./api/user-api";
import { getAllStories } from "./api/story-api";

const App = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [{ user, allStories, allFavouritesStories, allUsers }, dispatch] =
    useStateValue();

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          validateUser(token).then((data) => {
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
          });
        });
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (!allStories) {
      getAllStories().then((data) => {
        if (data) {
          dispatch({
            type: actionType.SET_ALL_STORIES,
            allStories: data.data,
          });
        }
      });
    }

    if (!allFavouritesStories) {
      getAllFavourites().then((data) => {
        if (data) {
          dispatch({
            type: actionType.SET_FAVOURITES_STORIES,
            allFavouritesStories: data.data,
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!allUsers || allUsers.length > 0) {
      getAllUsers().then((data) => {
        if (data) {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        }
      });
    }
  }, []);
  useEffect(() => {
    const checkUserRole = async () => {
      if ((await user?.user?.role) !== "admin") {
        console.log("user.user.role: ", user?.user?.role);
        navigate("/", { replace: true });
      }
    };

    checkUserRole();
  }, []);

  return (
    <AnimatePresence>
      <div className="">
        {isLoading ||
          (!user && (
            <div className="fixed inset-0 bg-loaderOverlay backdrop-blur-sm ">
              <Loader />
            </div>
          ))}
        <Routes>
          <Route path="/*" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/google-login"
            element={<GoogleAuth setGoogleAuth={setAuth} />}
          />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
};

export default App;
