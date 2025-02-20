import Button from "@mui/material/Button";
import { Link } from "react-router";
import Hero from "../components/Hero.jsx";

const Leaderboard = () => {
  return (
    <div>
      <Hero displayText="high scores" />
      <Link to="/">
        <Button className="rounded-md bg-green-600 px-4 py-1">
          Return Home
        </Button>
      </Link>
    </div>
  );
}

export default Leaderboard;
