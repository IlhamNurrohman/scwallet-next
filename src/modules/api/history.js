import axios from "axios";

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getHistory = (token, limit, filter, page) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/history?limit=${limit}&filter=${filter}&page=${page}`;
  return axios.get(URL, config(token));
};

export const getHistoryDetail = (token, id) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/history/${id}`;
  return axios.get(URL, config(token));
};
