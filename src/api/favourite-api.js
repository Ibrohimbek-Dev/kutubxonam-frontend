import axios from "axios";

const baseURL = "https://my-library-full-b681a2c722c2.herokuapp.com/";
console.log("baseURL: ", baseURL)

export const getAllFavourites = async () => {
  try {
    const res = await axios.get(`${baseURL}api/favourites/getAll`);
    if (res.data && res) {
      return res.data;
    }
  } catch (error) {
    return null;
  }
};

export const addToFavourites = async (data) => {
  try {
    const res = await axios.post(`${baseURL}api/favourites/save`, { ...data });
    if (res.data && res) {
      return res.data;
    }
  } catch (error) {
    return null;
  }
};

export const deleteFromFavourites = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}api/favourites/delete/${id}`);
    if (res) {
      return res;
    }
  } catch (error) {
    return null;
  }
};
