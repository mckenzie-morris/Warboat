import axios from "axios";

const refreshToken = async () => {
  try {
    const response = await axios.get(
      // when running just the server, change to: "/refresh"
      "http://localhost:3000/refresh",
      /* `withCredentials` indicates whether or not cross-site Access-Control requests
      should be made using credentials (such as cookies, authentication headers or 
      TLS client certificates) */
      { withCredentials: true },
    );
    console.log("🚩 successful axios request: ", response.data);
  } catch (error) {
    console.log(error.response.data);
  }
};

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
