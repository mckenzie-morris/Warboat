import axios from "axios";
import { refreshToken } from "./refreshToken.js";

const instance = axios.create({
  baseURL: "http://localhost:3000", // Set a base URL for all requests
});

instance.interceptors.response.use(
  // if there’s no error, the request passes through unchanged
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 403) {
      try {
        // pull setState function 'setLoggedIn' from request config
        const setLoggedIn = error.config.setLoggedIn
        // call refreshToken and return new Access Token
        const newAccessToken = await refreshToken(setLoggedIn);
        // updates the default headers globally for all (instance-based) requests
        instance.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;
        // clone the original request
        const originalRequest = error.config;
        // attach new Access Token to clone of original request
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // retry request and return response 
        return instance(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export {instance}