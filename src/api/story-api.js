import axios from "axios";

const baseURL = "https://my-library-full-b681a2c722c2.herokuapp.com/";

export const getAllStories = async () => {
  try {
    const res = axios.get(`${baseURL}api/stories/getAll`);
    return (await res).data;
  } catch (error) {
    return null;
  }
};
