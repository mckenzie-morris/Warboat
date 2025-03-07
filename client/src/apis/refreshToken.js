import axios from "axios";

const refreshToken = async (setStateFunc) => {
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
      setStateFunc(response.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  export {refreshToken}