import React, { useEffect } from "react";
import { bgColors } from "../../utils/styles";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { getAllStories } from "../../api/story-api";
import { FaUsers } from "react-icons/fa";
import { IoBook } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { getAllUsers } from "../../api/user-api";

export const DashboardCard = ({ icon, name, count }) => {
  const bg_color = bgColors[parseInt(Math.random() * bgColors.length)];

  return (
    <div
      style={{ background: `${bg_color}` }}
      className={`p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center justify-center`}
    >
      {icon}
      <p className="text-xl text-textColor font-semibold">{name}</p>
      <p className="text-sm text-textColor">{count}</p>
    </div>
  );
};

const DashboardHome = () => {
  const [{ allStories, allUsers }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allStories) {
      getAllStories().then((data) => {
        dispatch({
          type: actionType.SET_ALL_STORIES,
          allStories: data.ata,
        });
      });
    }
  }, [allStories]);

  useEffect(() => {
    if (!allUsers) {
      getAllUsers()
        .then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        })
        .catch((error) => {
          console.log("Error fetching allUsers:", error);
        });
    }
  }, []);

  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      <NavLink to={"/dashboard/users"}>
        <DashboardCard
          icon={<FaUsers className="text-3xl text-textColor" />}
          name={"Foydalanuvchilar"}
          count={allUsers?.length > 0 ? allUsers?.length : 0}
        />
      </NavLink>
      <NavLink to={"/dashboard/stories"}>
        <DashboardCard
          icon={<IoBook className="text-3xl text-textColor" />}
          name={"Hikoyalar"}
          count={allStories?.length > 0 ? allStories?.length : 0}
        />
      </NavLink>
    </div>
  );
};

export default DashboardHome;
