import axios, { AxiosRequestConfig } from "axios";
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
const post = async (
  url: string,
  data?: any,
  token?: string,
  axiosConfig?: AxiosRequestConfig
) => {
  return axios.post(`${BASE_URL}/${url}`, data, {
    ...axiosConfig,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const get = async (
  url: string,
  token?: string,
  axiosConfig?: AxiosRequestConfig
) => {
  return axios.get(`${BASE_URL}/${url}`, {
    ...axiosConfig,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const put = async (
  url: string,
  data?: any,
  token?: string,
  axiosConfig?: AxiosRequestConfig
) => {
  return axios.put(`${BASE_URL}/${url}`, data, {
    ...axiosConfig,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const del = async (
  url: string,
  data?: any,
  token?: string,
  axiosConfig?: AxiosRequestConfig
) => {
  return axios.delete(`${BASE_URL}/${url}`, {
    ...axiosConfig,
    data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export { post, get, put, del };
