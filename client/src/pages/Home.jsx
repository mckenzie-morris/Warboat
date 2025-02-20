import Button from "@mui/material/Button";
import { Link } from "react-router";
import Hero from "../components/Hero.jsx";

const Home = () => {
  return (
    <div>
      <Hero displayText="warboat" />
      <div className="flex h-screen flex-col items-center justify-evenly">
        <Link to="/game">
          <Button className="rounded-md bg-green-600 px-4 py-1">
            Start Game
          </Button>
        </Link>

        <Link to="/options">
          <Button className="rounded-md bg-green-600 px-4 py-1">Options</Button>
        </Link>

        <Link to="/leaderboard">
          <Button className="rounded-md bg-green-600 px-4 py-1">
            Leaderboard
          </Button>
        </Link>

        <Link to="/profile">
          <Button className="rounded-md bg-green-600 px-4 py-1">Profile</Button>
        </Link>

        <Link to="/login">
          <Button className="rounded-md bg-green-600 px-4 py-1">Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
