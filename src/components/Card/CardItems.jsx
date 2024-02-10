import React, { useEffect, useState } from "react";
import { FaPlay, FaDownload, FaFilePdf, FaPlus, FaPause } from "react-icons/fa";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { RiPlayListAddFill } from "react-icons/ri";
import { MdPlaylistAddCheck } from "react-icons/md";
import { useSidebar } from "../../context/SidebarProvider";
import { saveAs } from "file-saver";
import {
  addToFavourites,
  deleteFromFavourites,
  getAllFavourites,
} from "../../api/favourite-api";

const CardItems = ({
  title,
  imageURL,
  current,
  index,
  author,
  category,
  storyUrl,
  storyPdfUrl,
}) => {
  const [
    { story, isStoryPlaying, play, allFavouritesStories, allStories },
    dispatch,
  ] = useStateValue();

  const { setAlert, setAlertMsg } = useSidebar();

  const togglePlayPause = () => {
    if (!isStoryPlaying) {
      dispatch({
        type: actionType.SET_STORY_PLAYING,
        isStoryPlaying: true,
      });
    }

    if (isStoryPlaying || play) {
      dispatch({
        type: actionType.SET_PLAY,
        play: true,
      });
    }

    if (story !== index) {
      dispatch({
        type: actionType.SET_STORY,
        story: index,
      });
    }
  };

  useEffect(() => {
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

  const data = {
    name: allStories[index]?.name,
    imageURL: allStories[index]?.imageURL,
    storyURL: allStories[index]?.storyURL,
    category: allStories[index]?.category,
    storyPdfURL: allStories[index]?.storyPdfURL,
    author: allStories[index]?.author,
    id: allFavouritesStories?.[index]?._id,
  };

  const addItemToFavourites = () => {
    const isAlreadyFavourite = allFavouritesStories?.some(
      (item) => item.name === data.name
    );

    const itemId = data?.id;

    if (!isAlreadyFavourite) {
      addToFavourites(data).then((res) => {
        if (res.success) {
          setAlert("success");
          setAlertMsg(res.msg);

          getAllFavourites().then((favourites) => {
            dispatch({
              type: actionType.SET_FAVOURITES_STORIES,
              allFavouritesStories: favourites.data,
            });
          });

          setTimeout(() => {
            setAlert(false);
          }, 1000);
        } else {
          setAlert("error");
          setAlertMsg(res.msg);
          setTimeout(() => {
            setAlert(false);
          }, 1000);
        }
      });
    } else {
      if (itemId && isAlreadyFavourite) {
        deleteFromFavourites(itemId)
          .then((res) => {
            if (res && res.data.success) {
              setAlert("success");
              setAlertMsg(res.data.msg);
              getAllFavourites()
                .then((data) => {
                  if (data && data.data) {
                    dispatch({
                      type: actionType.SET_FAVOURITES_STORIES,
                      allFavouritesStories: data.data,
                    });
                  } else {
                    console.log("No favorites data received from the server");
                  }
                })
                .catch((error) => {
                  console.log("Error fetching favorites: ", error);
                });

              console.log("Item successfully deleted!");
              setTimeout(() => {
                setAlert(false);
              }, 1000);
            } else {
              setAlert("error");
              setAlertMsg("Ma'lumotni o'chirishda xatolik yuz berdi");
              setTimeout(() => {
                setAlert(false);
              }, 4000);
            }
          })
          .catch((error) => {
            console.log("Error deleting item: ", error);
          });
      } else {
        console.log("Item id is missing!");
      }
    }
  };

  const pdfDownloadHandleClick = async () => {
    const pdfUrl = await storyPdfUrl;
    saveAs(pdfUrl, "downloaded.pf");
  };

  const mp3DownloadHandleClick = async () => {
    const mp3url = await storyUrl;
    saveAs(mp3url, "downloaded.mp3");
  };

  return (
    <div
      key={index}
      className="pb-1 hover:scale-110 cursor-pointer overflow-hidden border hover:shadow-md shadow-sm flex-col rounded-2xl flex h-full ease-in-out duration-1000 xsm:w-28 w-48 lg:w-64 transform transition-transform"
      style={{
        transform: `translateX(-${current * 105}%)`,
      }}
    >
      <div className="relative h-full">
        <img
          src={imageURL}
          alt={index}
          className="card-image  xsm:hidden w-full cursor-pointer h-auto lg:h-48 object-cover lg:object-cover hover:scale-110 transition-all duration-500 overflow-hidden"
        />
        <div className="flex items-start h-auto flex-col justify-start p-1">
          <p className="card-title leading-4 xsm:text-xxsm text-base lg:text-xl font-semibold ">
            {title.length > 20 ? `${title.slice(0, 20) + "..."}` : title}
          </p>

          <p className="text-xxsm italic">
            {category ? `(${category})` : null}
          </p>
          <p className="italic md:flex card-description xsm:text-xxsm text-sm lg:text-base text-gray-600">
            {author.length > 30 ? `${author.slice(0, 30) + "..."}` : author}
          </p>
        </div>
      </div>
      <div className="p-2 md:py-0 flex justify-between bg-white">
        <button
          onClick={togglePlayPause}
          className="card-button text-rose-950 xsm:text-xxsm md:bg-blue-500 md:p-1 md:text-white lg:py-2 lg:px-4 rounded  focus:outline-none"
        >
          {isStoryPlaying && story === index ? <FaPause /> : <FaPlay />}
        </button>
        <button
          onClick={pdfDownloadHandleClick}
          className="card-button text-rose-950 xsm:text-xxsm md:bg-blue-500 md:p-1 md:text-white lg:py-2 lg:px-4 rounded  focus:outline-none"
        >
          <FaFilePdf />
        </button>

        <button
          onClick={mp3DownloadHandleClick}
          className="card-button text-rose-950 xsm:text-xxsm md:bg-gray-500 md:text-white md:p-1 lg:py-2 lg:px-4 rounded  focus:outline-none"
        >
          <FaDownload />
        </button>

        <button
          onClick={addItemToFavourites}
          className="card-button text-rose-950 xsm:text-xxsm md:bg-gray-500 md:text-white md:p-1 lg:py-2 lg:px-4 rounded focus:outline-none"
        >
          {allFavouritesStories?.some((item) => item.name === data.name) ? (
            <MdPlaylistAddCheck />
          ) : (
            <RiPlayListAddFill />
          )}
        </button>
      </div>
    </div>
  );
};

export default CardItems;

// Story Player'da muammo bor
