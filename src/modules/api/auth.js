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
export const forgotPassword = (body) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`;
  return axios.post(URL, body);
};
export const resetPassword = (body) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`;
  return axios.patch(URL, body);
};