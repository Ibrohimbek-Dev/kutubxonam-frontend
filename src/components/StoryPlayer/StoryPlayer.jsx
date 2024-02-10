import React, { useEffect, useRef, useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import { RiPlayListFill } from "react-icons/ri";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { IoMdClose } from "react-icons/io";
import PlayListCard from "./PlayListCard";
import { motion } from "framer-motion";
import { actionType } from "../../context/reducer";
import { MdCloseFullscreen } from "react-icons/md";
import { useSidebar } from "../../context/SidebarProvider";

const StoryPlayer = ({ playingStory }) => {
  const { isPlaylist, setIsPlayList } = useSidebar();

  const [{ allStories, story, isStoryPlaying, miniPlayer }, dispatch] =
    useStateValue();

  // const selectedStoryArray = filteredStories ? filteredStories : allStories;
  const selectedStoryArray = playingStory;

  console.log("selectedStoryArray: ", selectedStoryArray);

  const closeStoryPlayer = () => {
    if (isStoryPlaying) {
      dispatch({
        type: actionType.SET_STORY_PLAYING,
        isStoryPlaying: false,
      });
    }
  };

  const togglePlayer = () => {
    if (miniPlayer) {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: false,
      });
    } else {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: true,
      });
    }
  };

  const nextStory = () => {
    if (story >= selectedStoryArray.length - 1) {
      dispatch({
        type: actionType.SET_STORY,
        story: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_STORY,
        story: story + 1,
      });
    }
  };

  const prevStory = () => {
    if (story <= 0) {
      dispatch({
        type: actionType.SET_STORY,
        story: selectedStoryArray.length - 1,
      });
    } else {
      dispatch({
        type: actionType.SET_STORY,
        story: story - 1,
      });
    }
  };

  useEffect(() => {
    if (story > selectedStoryArray.length) {
      dispatch({
        type: actionType.SET_STORY,
        story: 0,
      });
    }
  }, [story, selectedStoryArray, dispatch]);

  const playStory = () => {
    dispatch({
      type: actionType.SET_PLAY,
      play: true,
    });
  };

  const onEndFunc = () => {
    dispatch({
      type: actionType.SET_PLAY,
      play: false,
    });
  };

  return (
    <div className="w-full full flex items-center gap-3 overflow-hidden">
      <div
        className={`w-full full items-center gap-3 p-4 ${
          miniPlayer ? "absolute top-40" : "flex relative"
        }`}
      >
        <img
          src={selectedStoryArray[story]?.imageURL}
          className="hidden w-40 md:flex h-auto object-cover rounded-md"
          alt="story image"
        />
        <div className="flex items-start flex-col">
          <p className="md:text-xl text-base xsm:text-sm text-headingColor font-semibold">
            {`${
              selectedStoryArray[story]?.name.length > 15
                ? selectedStoryArray[story]?.name.slice(0, 15) + "..."
                : selectedStoryArray[story]?.name
            }`}{" "}
          </p>

          <p className="text-textColor xsm:text-xxsm mnsm:text-sm">
            {selectedStoryArray[story]?.author}{" "}
            <span className="text-sm xsm:text-xxsm text-textColor font-semibold">
              ({selectedStoryArray[story]?.category})
            </span>
          </p>

          <motion.i
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsPlayList(!isPlaylist)}
          >
            <RiPlayListFill className="text-textColor hover:text-headingColor xsm:text-sm text-base md:text=3xl cursor-pointer" />
          </motion.i>
        </div>

        <div className="flex xsm:w-3/6 w-5/6 md:w-full items-center justify-between">
          <AudioPlayer
            src={selectedStoryArray[story]?.storyURL}
            onPlay={playStory}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextStory}
            onClickPrevious={prevStory}
            onEnded={onEndFunc}
            loop={false}
            onPause={playStory}
          />
        </div>

        <div className="h-full flex items-center justify-center flex-col gap-3">
          <motion.i whileTap={{ scale: 0.8 }} onClick={closeStoryPlayer}>
            <IoMdClose className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
          </motion.i>

          <motion.i whileTap={{ scale: 0.8 }} onClick={togglePlayer}>
            <MdCloseFullscreen className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
          </motion.i>
        </div>
      </div>

      {isPlaylist && (
        <>
          <PlayListCard playListStories={playingStory} />
        </>
      )}

      {miniPlayer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed right-2 bottom-2"
        >
          <div className="xsm:w-20 xsm:h-20 w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#7BA05B] blur-xl animate-pulse"></div>
            <img
              onClick={togglePlayer}
              src={selectedStoryArray[story]?.imageURL}
              className="z-50 xsm:w-20 xsm:h-20 w-24 h-24 md:w-32 md:h-32 rounded-full object-cover cursor-pointer"
              alt=""
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default StoryPlayer;
