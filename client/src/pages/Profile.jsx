import Button from "@mui/material/Button";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import Loading from "./Loading.jsx";
import Hero from "../components/Hero.jsx";
import { ProfileContext } from "../index.jsx";
import { instanceWithInterceptor } from "../apis/interceptor.js";

const Profile = () => {
  const { isLoggedIn, setLoggedIn } = React.useContext(ProfileContext);
  const [serverResponse, setServerResponse] = React.useState(null);
  const navigate = useNavigate();
  // initialize a React ref to null
  const loggedInRef = React.useRef(null);

  React.useEffect(() => {
    // map 'loggedInRef' to 'isLoggedIn' state
    loggedInRef.current = isLoggedIn;
    console.log("loggedInRef.current: ", loggedInRef.current);
  }, [isLoggedIn]);

  React.useEffect(() => {
    const delayedRequest = async () => {
      /* if after 500ms there is still not a a user to reference in 'loggedInRef', 
      redirect the user to '/login' page */
      if (!loggedInRef.current) {
        return navigate("/login");
      }
      try {
        const response = await instanceWithInterceptor.get("/profile", {
          headers: {
            /* if 'isLoggedIn' state's access token is still valid when this page is accessed, 
              or the necessary amount of time has elapsed for the 'ProfileProvider' to return a new 
              access token from the '/refresh' endpoint, send the access token on the appropriate
               request header */
            Authorization: `Bearer ${loggedInRef.current[0].accessToken}`,
          },

          // attach setState function 'setLoggedIn' to request config
          setLoggedIn: setLoggedIn,

          /* `withCredentials` indicates whether or not cross-site Access-Control requests
            should be made using credentials (such as cookies, authentication headers or 
            TLS client certificates) */
          withCredentials: true,
        });
        console.log("🚩 successful axios request: ", response.data);
        setServerResponse(response.data);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    /* provide ample time for for the ProfileProvider to mount (on initial 'root' render) and 
    return a new access token from the '/refresh' endpoint if refresh token is present (and valid)
    on HTTP-only secure cookie */
    setTimeout(delayedRequest, 500);
  }, []);

  return (
    <div>
      {!serverResponse ? (
        <Loading />
      ) : (
        <div>
          <Hero displayText="profile" />
          {Object.entries(serverResponse).map(([key, val], idx) => {
            return <p key={idx}>{`${key}: ${val}`}</p>;
          })}
          <Link to="/">
            <Button className="rounded-md bg-green-600 px-4 py-1">
              Return Home
            </Button>
          </Link>

          <Button className="rounded-md bg-green-600 px-4 py-1">
            Change username
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
