import { instanceWithInterceptor } from "../apis/interceptor.js";

const changePassword = async (accessToken, setStateFunc) => {
    const oldPassword = document.getElementById("input-password").value
    const newPassword = document.getElementById("input-NewPassword").value
    const confirmedNewPassword = document.getElementById("input-confirm-newPassword").value
    try {
        const response = await instanceWithInterceptor.patch(
          "/profile/password",
          // request config object
          {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmedNewPassword: confirmedNewPassword,
          },
          {
          headers: {
            /* if 'isLoggedIn' state's access token is still valid when this page is accessed, 
              or the necessary amount of time has elapsed for the 'ProfileProvider' to return a new 
              access token from the '/refresh' endpoint, send the access token on the appropriate
               request header */
            Authorization: `Bearer ${accessToken}`,
          },

          // attach setState function 'setLoggedIn' to request config
          setLoggedIn: setStateFunc,
          /* `withCredentials` indicates whether or not cross-site Access-Control requests
            should be made using credentials (such as cookies, authentication headers or 
            TLS client certificates) */
           withCredentials: true },
        );
        console.log("successful password change ✅", response.data);
        setStateFunc(response.data);
        return "password change successful"
      } catch (error) {
        console.log(error.response?.data);
        return `error occurred: ${JSON.stringify(error.response?.data?.message)}`
      }
}

export default changePassword