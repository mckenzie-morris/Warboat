import { instanceWithInterceptor } from "../apis/interceptor.js";

const requestProfileData = async (
  ref,
  nav,
  setLoggedInFunc,
  setServerResponseFunc,
) => {
  /* if after 500ms there is still not a a user to reference in 'loggedInRef', 
    redirect the user to '/login' page */
  if (!ref) {
    return nav("/login");
  }
  try {
    const response = await instanceWithInterceptor.get("/profile", {
      headers: {
        /* if 'isLoggedIn' state's access token is still valid when this page is accessed, 
            or the necessary amount of time has elapsed for the 'ProfileProvider' to return a new 
            access token from the '/refresh' endpoint, send the access token on the appropriate
             request header */
        Authorization: `Bearer ${ref[0].accessToken}`,
      },

      // attach setState function 'setLoggedIn' to request config
      setLoggedIn: setLoggedInFunc,

      /* `withCredentials` indicates whether or not cross-site Access-Control requests
          should be made using credentials (such as cookies, authentication headers or 
          TLS client certificates) */
      withCredentials: true,
    });
    console.log("profile data request successful ✅", response.data);
    setServerResponseFunc(response.data);
  } catch (error) {
    console.log(error.response?.data);
  }
};

export default requestProfileData;
