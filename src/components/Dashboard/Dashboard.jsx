import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { NavLink, Route, Routes } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { isActiveStyles, isNotActiveStyles } from "../../utils/styles";
import DashboardHome from "./DashboardHome";
import DashboardUser from "./DashboardUser";
import DashboardStories from "./DashboardStories";
import { useStateValue } from "../../context/StateProvider";
import { getAllUsers } from "../../api/user-api";
import { actionType } from "../../context/reducer";

const Dashboard = () => {
  const [{ allUsers }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allUsers || allUsers.length > 0) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
      });
    }
  }, []);
  return (
    <div className="xsm:mt-8 mt-16 p-1 md:mt-24 z-10 w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Navbar />

      <div className="w-[60%] my-2 p-4 flex items-center justify-evenly">
        <NavLink to={"/dashboard/home"}>
          <IoHome className="text-2xl text-textColor" />
        </NavLink>

        <NavLink
          to={"/dashboard/users"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          Users
        </NavLink>
        <NavLink
          to={"/dashboard/stories"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          Stories
        </NavLink>
      </div>

      <div className="my-4 w-full p-4">
        <Routes>
          <Route path="/home" element={<DashboardHome />} />
          <Route path="/users" element={<DashboardUser />} />
          <Route path="/stories" element={<DashboardStories />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
