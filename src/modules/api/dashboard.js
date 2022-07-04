import axios from "axios";

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getStats = (token, id) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/${id}`;
  return axios.get(URL, config(token));
};
