import Button from "@mui/material/Button";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import Loading from "./Loading.jsx";
import Hero from "../components/Hero.jsx";
import { ProfileContext } from "../index.jsx";
import ChangeUsername from "../components/ChangeUsername.jsx";
import ChangePassword from "../components/ChangePassword.jsx";
import DeleteProfile from "../components/DeleteProfile.jsx";
import requestProfileData from "../apis/profile.js";

const Profile = () => {
  const { isLoggedIn, setLoggedIn } = React.useContext(ProfileContext);
  const [serverResponse, setServerResponse] = React.useState(null);
  const navigate = useNavigate();
  // initialize a React ref to null
  const loggedInRef = React.useRef(null);

  React.useEffect(() => {
    // map 'loggedInRef' to 'isLoggedIn' state
    loggedInRef.current = isLoggedIn;
    const checkProfile = setTimeout(() => {
      if (!isLoggedIn) {
        navigate("/")
      }
    }, 500)
    /* 'return' keyword inside a 'useEffect' hook indicates a special 'cleanup' function;
    it is executed on the unmount, or before the effect re-runs (the dependency changes) */
    return () => clearTimeout(checkProfile)
  }, [isLoggedIn]);

  React.useEffect(() => {
    setTimeout(() => {
      requestProfileData(
        loggedInRef.current,
        navigate,
        setLoggedIn,
        setServerResponse,
      );
    }, 500);
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
          <ChangeUsername />
          <ChangePassword />
          <DeleteProfile/>
        </div>
      )}
    </div>
  );
};

export default Profile;
