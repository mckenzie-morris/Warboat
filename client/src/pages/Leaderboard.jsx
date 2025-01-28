import Button from "@mui/material/Button";
import { Link } from "react-router";

const Leaderboard = () => {
  return (
    <div>
      <h1 className="text-9xl">Leaderboard</h1>
      <Link to="/">
        <Button className="rounded-md bg-green-600 px-4 py-1">
          Return Home
        </Button>
      </Link>
    </div>
  );
}

export default Leaderboard;
