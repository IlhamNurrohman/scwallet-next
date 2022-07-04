import axios from "axios";

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getDetailUser = (token, id) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile/${id}`;
  return axios.get(URL, config(token));
};

export const checkPin = (token, pin) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/pin?pin=${pin}`;
  return axios.get(URL, config(token));
};

export const editProfile = (token, id, body) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile/${id}`;
  return axios.patch(URL, body, config(token));
};

export const editPhone = (token, id, body) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile/${id}`;
  return axios.patch(URL, body, config(token));
};

export const editImage = (token, id, body) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/image/${id}`;
  return axios.patch(URL, body, config(token));
};

export const editPin = (token, id, body) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/pin/${id}`;
  return axios.patch(URL, body, config(token));
};
