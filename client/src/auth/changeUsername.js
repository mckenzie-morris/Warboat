
import { instanceWithInterceptor } from "../apis/interceptor.js";

const changeUsername = async (accessT, setStateFunc) => {
    const newUsername = document.getElementById("input-NewUsername").value
    const confirmedNewUsername = document.getElementById("input-confirm-NewUsername").value
    const submittedPassword = document.getElementById("input-confirm-NewUsername").value
    try {
        const response = await instanceWithInterceptor.patch(
          "/profile/username",
          // request config object
          {
            newUsername: newUsername,
            confirmedNewUsername: confirmedNewUsername,
            submittedPassword: submittedPassword,
          },
          {
          headers: {
            /* if 'isLoggedIn' state's access token is still valid when this page is accessed, 
              or the necessary amount of time has elapsed for the 'ProfileProvider' to return a new 
              access token from the '/refresh' endpoint, send the access token on the appropriate
               request header */
            Authorization: `Bearer ${accessT}`,
          },

          // attach setState function 'setLoggedIn' to request config
          setLoggedIn: setStateFunc,
          /* `withCredentials` indicates whether or not cross-site Access-Control requests
            should be made using credentials (such as cookies, authentication headers or 
            TLS client certificates) */
           withCredentials: true },
        );
        console.log("🚩 successful name change: ", response.data);
        setStateFunc(response.data);
        return "username change successful"
      } catch (error) {
        console.log(error.response?.data);
        return `error occurred: ${JSON.stringify(error.response?.data?.message)}`
      }
}

export default changeUsername