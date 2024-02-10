import React, { useEffect, useState } from "react";
import Popular from "../Popular/Popular";
import { useStateValue } from "../../context/StateProvider";
import { AnimatePresence, motion } from "framer-motion";
import FadeInSpan from "../Effects/FadeInSpan";
import { actionType } from "../../context/reducer";
import { useSidebar } from "../../context/SidebarProvider";
import AfterSearch from "../AfterSearch/AfterSearch";

const HomeContainer = () => {
  const [filterStory, setFilterStory] = useState(null);
  const [
    { searchTerm, allStories, searchItem, filteredStories, searchBy },
    dispatch,
  ] = useStateValue();

  useEffect(() => {
    if (searchTerm && allStories) {
      const loweredSearch = searchTerm.toLowerCase().trim().split(/\s+/);
      const filtered = [];

      for (let story of allStories) {
        let storyByNames = [];
        if (searchBy === "Book") {
          storyByNames = story.name.toLowerCase().split(/\s+/);
        } else if (searchBy === "Author") {
          storyByNames = story.author.toLowerCase().split(/\s+/);
        }

        const isMatch = loweredSearch.every((searchWord) => {
          return storyByNames.some((storyWord) => storyWord === searchWord);
        });

        if (isMatch) {
          filtered.push(story);
        }
      }

      setFilterStory(filtered.length > 0 ? filtered : null);

      dispatch({
        type: actionType.SET_FILTERED_STORIES,
        filteredStories: filtered.length > 0 ? filtered : null,
      });
    } else {
      setFilterStory(null);
      dispatch({
        type: actionType.SET_FILTERED_STORIES,
        filteredStories: null,
      });
    }
  }, [searchTerm, allStories, dispatch, searchBy]);

  useEffect(() => {
    if (filterStory) {
      dispatch({
        type: actionType.SET_FILTERED_STORIES,
        filteredStories: filterStory,
      });
    } else {
      dispatch({
        type: actionType.SET_FILTERED_STORIES,
        filteredStories: null,
      });
    }
  }, [filteredStories, filterStory, dispatch]);

  return (
    <div className="xsm:mt-8 mt-16 w-full p-1 h-full md:mt-24 z-10">
      {searchTerm?.length > 0 && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="my-4 text-base text-textColor"
          >
            Izlanmoqda: <FadeInSpan text={searchTerm} />
          </motion.div>
        </AnimatePresence>
      )}
      {searchItem && searchTerm.length > 0 ? (
        <div className="space-y-4">
          <AfterSearch
            searchedStories={
              filteredStories?.length > 0 ? filteredStories : null
            }
            text={
              filteredStories?.length > 0
                ? "Topilgan ma'lumotlar"
                : "Hech qanday ma'lumot topilmadi!"
            }
          />
        </div>
      ) : (
        <div className="space-y-4">
          <Popular popularStories={allStories} />
        </div>
      )}
    </div>
  );
};

export default HomeContainer;
