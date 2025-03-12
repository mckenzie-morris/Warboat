import Button from "@mui/material/Button";


import { Link, Navigate } from "react-router";
// import { useNavigate } from "react-router";


import Hero from "../components/Hero.jsx";
import { ProfileContext } from "../index.jsx";
import { instanceWithInterceptor } from "../apis/interceptor.js";

const Profile = () => {
  const { isLoggedIn, setLoggedIn } = React.useContext(ProfileContext);
  const [serverRes, setServerRes] = React.useState(null)
  // const navigate = useNavigate();
  // if (!isLoggedIn) {
  //   return navigate("/login");
  // }

  // if (!isLoggedIn) {
  //   return <Navigate to={"/login"} />;
  // }
  
  React.useEffect(() => {

    const grabProtectedStuff = async () => {
      try {
        const response = await instanceWithInterceptor.get(
          // when running just the server, change to: "/profile"
          "/profile",
          {
            headers: { Authorization: `Bearer ${isLoggedIn[0].accessToken}` },

            // attach setState function 'setLoggedIn' to request config
            setLoggedIn: setLoggedIn,

            /* `withCredentials` indicates whether or not cross-site Access-Control requests
            should be made using credentials (such as cookies, authentication headers or 
            TLS client certificates) */
            withCredentials: true,
          },
        );
        console.log("🚩 successful axios request: ", response.data);
        setServerRes(response.data)
      } catch (error) {
        console.log("💩💩💩", error.response?.data);
      }
    };
    grabProtectedStuff();
  }, []);

  return (
    <div>
      <Hero displayText="profile" />
      {!serverRes ? 'waiting...' : Object.entries(serverRes).map(([key, val], idx) => {
        return <p key={idx}>{`${key}: ${val}`}</p>
      })}
      <Link to="/">
        <Button className="rounded-md bg-green-600 px-4 py-1">
          Return Home
        </Button>
      </Link>
    </div>
  );
};

export default Profile;
