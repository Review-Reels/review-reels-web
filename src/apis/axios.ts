import axios, { AxiosRequestConfig } from "axios";

import { BACKEND_URL } from "../constants/ApiUrls";

const apiClient = axios.create({
  baseURL: BACKEND_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(
  async function (config: AxiosRequestConfig) {
    // Do something before request is sent

    try {
      const userData = await localStorage.getItem("user-data");
      if (userData) {
        const {
          state: {
            user: { Authorization },
          },
        } = JSON.parse(userData);
        if (Authorization && config.headers)
          config.headers.Authorization = "Bearer " + Authorization;
      }
    } catch (e) {
      console.log(e);
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  async function (error) {
    // console.log(error);
    // console.log(error.response);
    if (error.response?.status === 401) {
      console.log("remove local storage");
      await localStorage.removeItem("user-data");
      window.location.reload();
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default apiClient;
