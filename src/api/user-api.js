import axios from "axios";

const baseURL = "https://kutubxonam-backend-dce6318bdf52.herokuapp.com/";
// const baseURL = "http://localhost:4000/";


export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseURL}api/users/login`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}api/users/getUsers`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const removeUser = async (userId) => {
  try {
    const res = await axios.delete(`${baseURL}api/users/delete/${userId}`);
    if (res) {
      return res.data;
    }
  } catch (error) {
    return null;
  }
};

export const changingUserRole = async (userId, role) => {
  try {
    const res = await axios.put(`${baseURL}api/users/updateRole/${userId}`, {
      role: role,
    });
    return res.data;
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
