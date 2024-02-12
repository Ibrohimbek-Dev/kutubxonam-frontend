import axios from "axios";
const baseURL = "https://kutubxonam-backend-dce6318bdf52.herokuapp.com/";
// const baseURL = "http://localhost:4000/";

export const getAllStories = async () => {
  try {
    const res = axios.get(`${baseURL}api/stories/getAll`);
    return (await res).data;
  } catch (error) {
    return null;
  }
};
