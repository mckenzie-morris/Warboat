import Modal from "../components/Modal.jsx";
import Button from "@mui/material/Button";
import { Link } from "react-router";
import Hero from "../components/Hero.jsx";
import Carousel from "../components/Carousel.jsx";

const Options = () => {
  return (
    <div>
      <Hero displayText="options" />
      <Modal
        displayTextOpenButton="Select Theme"
        displayTextCloseButton="Close!"
        modalContent={<Carousel/>}
      />
      <Link to="/">
        <Button className="rounded-md bg-green-600 px-4 py-1">
          Return Home
        </Button>
      </Link>
    </div>
  );
};

export default Options;
