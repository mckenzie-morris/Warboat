import axios from "axios";
import { refreshToken } from "./refreshToken.js";

const instanceWithInterceptor = axios.create({
  baseURL: "http://localhost:3000", // Set a base URL for all requests
});

instanceWithInterceptor.interceptors.response.use(
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
        // clone the original request
        const originalRequest = error.config;
        // attach new Access Token to clone of original request
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // retry request and return response 
        return instanceWithInterceptor(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export {instanceWithInterceptor}