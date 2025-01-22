import Modal from "../components/Modal.jsx";
import Button from "@mui/material/Button";
import { Link } from "react-router";

const Options = () => {
  return (
    <div>
      <h1 className="text-9xl">Options</h1>
      <Modal />
      <Link to="/">
        <Button className="rounded-md bg-green-600 px-4 py-1">
          Return Home
        </Button>
      </Link>
    </div>
  );
};

export default Options;
