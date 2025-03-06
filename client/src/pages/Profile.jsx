import Button from "@mui/material/Button";
import { Link, Navigate } from "react-router";
import Hero from "../components/Hero.jsx";
import { ProfileContext } from "../index.jsx";
import React from "react";
import axios from "axios";

const Profile = () => {
  const { isLoggedIn, setLoggedIn } = React.useContext(ProfileContext);
  if (!isLoggedIn) {
    return <Navigate to={'/'} />
  }

  const grabProtectedStuff = (async () => {
    try {
      const response = await axios.get(
        // when running just the server, change to: "/profile"
        "http://localhost:3000/profile",
        { headers: {"Authorization" : `Bearer ${isLoggedIn[0].accessToken}`},
        /* `withCredentials` indicates whether or not cross-site Access-Control requests
          should be made using credentials (such as cookies, authentication headers or 
          TLS client certificates) */
         withCredentials: true },
      );
      console.log("🚩 successful axios request: ", response.data);
    } catch (error) {
      console.log("💩💩💩", error.response?.data);
    }
  })()

  return (
    <div>
      <Hero displayText="profile" />
      <p>{isLoggedIn[0].accessToken}</p>
      <Link to="/">
        <Button className="rounded-md bg-green-600 px-4 py-1">
          Return Home
        </Button>
      </Link>
    </div>
  );
}

export default Profile;