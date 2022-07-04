import axios from "axios";

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const register = (body) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`;
  return axios.post(URL, body);
};

export const login = (body) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`;
  return axios.post(URL, body);
};
