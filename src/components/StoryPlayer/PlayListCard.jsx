import React, { useEffect, useRef } from "react";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { motion } from "framer-motion";
import { IoMdMusicalNote } from "react-icons/io";
import { useClickOutside } from "../../hooks/hooksFuncs";
import { useSidebar } from "../../context/SidebarProvider";

const PlayListCard = ({ playListStories }) => {
  const [{ allStories, story, isStoryPlaying }, dispatch] = useStateValue();
  const playListOptionsRef = useRef(null);
  const { setIsPlayList } = useSidebar();

  useClickOutside(playListOptionsRef, () => {
    setIsPlayList(false);
  });

  const setCurrentPlayStory = (storyIndex) => {
    if (!isStoryPlaying) {
      dispatch({
        type: actionType.SET_STORY_PLAYING,
        isStoryPlaying: true,
      });
    }

    if (story !== storyIndex) {
      dispatch({
        type: actionType.SET_STORY,
        story: storyIndex,
      });
    }
  };

  return (
    <div
      ref={playListOptionsRef}
      onMouseEnter={() => setIsPlayList(true)}
      onMouseLeave={() => {
        setTimeout(() => setIsPlayList(false), 2000);
      }}
      className="absolute left-4 bottom-40 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-primary"
    >
      {playListStories?.length > 0 ? (
        playListStories?.map((storyData, index) => (
          <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer ${
              storyData?._id === story?._id ? "bg-card" : "bg-transparent"
            }`}
            onClick={() => setCurrentPlayStory(index)}
          >
            <IoMdMusicalNote className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer" />

            <div className="flex items-start flex-col">
              <p className="xsm:text-sm text-lg text-headingColor font-semibold">
                {storyData?.name}
              </p>

              <p className="text-textColor xsm:text-xxsm">
                {storyData.author}{" "}
                <span className="xsm:text-xxsm text-sm text-textColor font-semibold">
                  ({storyData?.category})
                </span>
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default PlayListCard;
