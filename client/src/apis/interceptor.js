import axios from "axios";
import { refreshToken } from './refreshToken';

const instance = axios.create({
  baseURL: "http://localhost:3000", // Set a base URL for all requests
  //   headers: {
  //     "Content-Type": "application/json", // Set default headers for all requests
  //   },
});

instance.interceptors.response.use(
  // if there’s no error, the request passes through unchanged
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      try {
        const newAccessToken = await refreshToken();
        // updates the default headers globally for all Axios requests (not just instance)
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;

        const originalRequest = error.config;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
