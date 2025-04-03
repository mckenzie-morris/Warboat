import { instanceWithInterceptor } from "../apis/interceptor.js";

const deleteProfile = async (
  accessToken,
  setStateFunc,
  submittedUsername,
  submittedPassword,
) => {

  try {
    const response = await instanceWithInterceptor.delete(
      "/profile/delete",
      // request config object

      {
        data: {
          submittedUsername: submittedUsername,
          submittedPassword: submittedPassword,
        },
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
        withCredentials: true,
      },
    );
    console.log("profile successfully deleted ✅", response.data);
    setTimeout(() => {setStateFunc(null)}, 2500)
    
    return "profile successfully deleted";
  } catch (error) {
    console.log(error.response?.data);
    return `error occurred: ${JSON.stringify(error.response?.data?.message)}`;
  }
};

export default deleteProfile;
