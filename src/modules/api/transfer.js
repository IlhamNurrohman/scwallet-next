import axios from "axios";

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllUser = (token, page, search) => {
  const URL = !search
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/user?limit=5&sort=firstName%20ASC&page=${page}`
    : `${process.env.NEXT_PUBLIC_BACKEND_URL}/user?limit=5&search=${search}&sort=firstName%20ASC&page=${page}`;
  return axios.get(URL, config(token));
};

export const transfer = (token, body) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/transfer`;
  return axios.post(URL, body, config(token));
};

export const exportTransaction = (token, id) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/export/transaction/${id}`;
  return axios.get(URL, config(token));
};
