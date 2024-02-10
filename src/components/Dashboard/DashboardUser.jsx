import React, { useEffect, useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import { AiOutlineClear } from "react-icons/ai";
import { motion } from "framer-motion";
import DashboardUserCard from "./DashboardUserCard";
import { getAllUsers } from "../../api/user-api";
import { actionType } from "../../context/reducer";

const DashboardUser = () => {
  const [emailFilter, setEmailFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const [filterUsers, setFilterUsers] = useState(null);

  const [{ allUsers }, dispatch] = useStateValue();

  useEffect(() => {
    if (emailFilter) {
      const filtered = allUsers.filter((data) => {
        return (
          data.email.includes(emailFilter) ||
          data.name.includes(emailFilter) ||
          data.role.includes(emailFilter)
        );
      });
      setFilterUsers(filtered);
    }
  }, [emailFilter]);

  useEffect(() => {
    if (!allUsers || allUsers.length > 0) {
      getAllUsers().then((userData) => {
        if (userData) {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: userData.data,
          });
        }
      });
    }
  }, []);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-24">
        <input
          type="text"
          placeholder="Shu yerdan izlang..."
          className={`w-52 px-4 py-2 border ${
            isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
          } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />

        {emailFilter && (
          <motion.i
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.75 }}
            onClick={() => {
              setEmailFilter("");
              setFilterUsers(null);
            }}
          >
            <AiOutlineClear className="text-3xl text-textColor cursor-pointer" />
          </motion.i>
        )}
      </div>

      <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3">
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm mr-1 font-semibold text-textColor">
              Foydalanuvchilar Soni:{" "}
            </span>
            <span className="text-mainColor">
              {filterUsers ? filterUsers?.length : allUsers?.length} nafar
            </span>
          </p>
        </div>

        <div className="w-full min-w-[750px] flex items-center justify-between">
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Surat
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Ism
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Email
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Tasdiqlangan
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            A'zo bo'lingan
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Pozitsiyasi
          </p>{" "}
        </div>

        {allUsers && !filterUsers
          ? allUsers?.map((data, index) => (
              <DashboardUserCard
                data={data}
                key={allUsers ? allUsers.length : 0}
                index={index}
              />
            ))
          : filterUsers?.map((data, index) => (
              <DashboardUserCard
                data={data}
                key={allUsers ? allUsers.length : 0}
                index={index}
              />
            ))}
      </div>
    </div>
  );
};

export default DashboardUser;
