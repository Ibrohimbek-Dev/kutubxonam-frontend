import React, { useEffect, useState } from "react";
import { useSidebar } from "../../context/SidebarProvider";
import SidebarVer from "../Sidebar/SidebarVer";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import HomeContainer from "./HomeContainer";
import "../../css/scrollbar.css";
import { useStateValue } from "../../context/StateProvider";
import StoryPlayer from "../StoryPlayer/StoryPlayer";
import AlertSuccess from "../Alerts/AlertSuccess";
import AlertError from "../Alerts/AlertError";

const Home = () => {
  const { openSidebar, alert, alertMsg } = useSidebar();
  const [
    { isStoryPlaying, filteredStories, allStories, searchItem },
    dispatch,
  ] = useStateValue();

  return (
    <AnimatePresence
      className="h-full bg-Hero bg-cover
      font-[Poppins] md:bg-top bg-center"
    >
      <div className="z-40">
        <Navbar />
      </div>

      <div className="flex flex-col w-full h-full overflow-hidden">
        <motion.div
          animate={{
            x: openSidebar ? "0%" : "-17vw",
            opacity: openSidebar ? 1 : 0,
          }}
          exit={{ x: openSidebar ? "-100%" : "0%", opacity: 0 }}
          transition={{ type: "tween", duration: 0.4 }}
          className={`${
            openSidebar ? "flex" : "opacity-0 pointer-events-none"
          } transition-opacity z-30 ease-in-out duration-300 h-full fixed overflow-hidden`}
        >
          <SidebarVer openSidebarVer={openSidebar} />
        </motion.div>

        <div className="h-full overflow-hidden">
          <motion.div
            className={`flex h-full ml-64`}
            animate={{
              x: openSidebar ? "0%" : "-16rem",
              width: openSidebar ? "auto" : "100%",
            }}
            transition={{ type: "tween", duration: 0.4 }}
          >
            <HomeContainer />
          </motion.div>
        </div>

        {isStoryPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              x: openSidebar ? "0%" : "-16rem",
              width: openSidebar ? "auto" : "100%",
            }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed ml-64 h-26 right-0 left-0  inset-x-0 bottom-0  bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
          >
            {filteredStories?.length > 0 && searchItem ? (
              <StoryPlayer playingStory={filteredStories} />
            ) : allStories?.length > 0 ? (
              <StoryPlayer playingStory={allStories} />
            ) : (
              <p>Hello World!</p>
            )}
          </motion.div>
        )}

        {alert && (
          <>
            {alert === "success" ? (
              <AlertSuccess msg={alertMsg} />
            ) : (
              <AlertError msg={alertMsg} />
            )}
          </>
        )}
      </div>
    </AnimatePresence>
  );
};

export default Home;
