import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";
import moment from "moment";
import { actionType } from "../../context/reducer";
import { changingUserRole, getAllUsers, removeUser } from "../../api/user-api";
import { MdDelete } from "react-icons/md";
import { FaCrown } from "react-icons/fa";

const DashboardUserCard = ({ data, index }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateRole, setIsUpdateRole] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [{ user, allUsers }, dispatch] = useStateValue();

  const createdAt = data.createdAt
    ? moment(data.createdAt).format("YYYY/MM/DD")
    : "N/A";

  const UpdateUserRole = (userId, role) => {
    setIsLoading(true);
    setIsUpdateRole(false);

    changingUserRole(userId, role).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        });

        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      }
    });
  };

  const deleteUser = (userId) => {
    setIsLoading(true);
    setIsDelete(true);
    if (userId) {
      removeUser(userId)
        .then((res) => {
          if (res) {
            console.log("res.status == 200: ", res.status == 200);
            getAllUsers()
              .then((userData) => {
                if (userData) {
                  console.log("userData: ", userData);
                  dispatch({
                    type: actionType.SET_ALL_USERS,
                    allUsers: userData.data,
                  });
                } else {
                  console.log("Hech qanday foydalanuvchi topilmadi!");
                }
              })
              .catch((error) => {
                console.log("Fetch qilishda xatolik yuz berdi: ", error);
              });

            console.log("User deleted successfully");
            setIsLoading(false);
            setIsDelete(false);

            setTimeout(() => {
              setIsLoading(false);
              setIsDelete(false);
            }, 2000);
          } else if (!res) {
            console.log("User'ni o'chirishda xatolik yuz berdi: ", res.data);
          }
        })
        .catch((error) => {
          console.log("Error deleting user: ", error);
        }).finally(() => {
          setIsLoading(false);
          setIsDelete(false)
        })
    }
  };

  useEffect(() => {
    if (!allUsers || allUsers.length > 0) {
      getAllUsers().then((users) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: users.data,
        });
      });
    }
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="w-full p-2 rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md"
      >
        <div className="flex gap-7 justify-center items-center">
          {data._id !== user?.user?._id ? (
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-md flex items-center justify-center bg-gray-200"
              onClick={() => setIsDelete(true)}
            >
              <MdDelete className="text-xl text-red-400 hover:text-red-500" />
            </motion.div>
          ) : (
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 flex rounded-md items-center justify-center bg-gray-200"
            >
              <FaCrown className="text-xl text-lime-600 " />{" "}
            </motion.div>
          )}

          {isDelete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute z-10 top-6 left-0 rounded-md p-4 flex items-start flex-col gap-4 bg-white shadow-xl"
            >
              <p className="text-textColor text-xxsm font-semibold">
                Ushbu foydalanuvchini o'chirib yubormoqchismiz?
              </p>

              <div className="flex justify-between mt-1 w-full items-center gap-4">
                <motion.button
                  whileTap={{ scale: 0.75 }}
                  className="outline-none border-none text-sm px-4 py-1 rounded-md bg-lime-500 text-black hover:shadow-md"
                  onClick={() => deleteUser(data?._id)}
                >
                  Ha!
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.75 }}
                  className="outline-none border-none text-sm px-4 py-1 rounded-md bg-gray-200 text-black hover:shadow-md"
                  onClick={() => setIsDelete(false)}
                >
                  Yo'q!
                </motion.button>
              </div>
            </motion.div>
          )}

          <div className="flex bg-transparent items-center justify-center">
            <img
              src={data?.imageURL}
              alt=""
              className="w-10 hover:scale-125 duration-300 transition-all ease-in-out bg-transparent h-10 object-cover rounded-md min-w-[40px] shadow-md"
            />
          </div>
        </div>

        <p className="text-base text-textColor w-275 min-w-[160px] text-center">
          {data?.name}
        </p>
        <p className="text-base text-textColor w-275 min-w-[160px] text-center">
          {data?.email}
        </p>
        <p className="text-base text-textColor w-275 min-w-[160px] text-center">
          {data?.email_verified ? "True" : "False"}
        </p>
        <p className="text-base text-textColor w-275 min-w-[160px] text-center">
          {createdAt}
        </p>

        <div className="w-275 min-w-[160px] text-center flex items-center justify-center gap-2 relative">
          <p className="text-base text-textColor">{data?.role}</p>
        </div>
        {/* 
        {isLoading && (
          <div className="absolute inset-0 bg-card animate-pulse"></div>
        )} */}
      </motion.div>
    </AnimatePresence>
  );
};

export default DashboardUserCard;
