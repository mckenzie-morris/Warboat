import Modal from "../components/Modal.jsx";

import pastel from "../assets/themes/pastel.png";
import retro from "../assets/themes/retro.png";
import neon from "../assets/themes/neon.png";
import gold from "../assets/themes/gold.png";
import spring from "../assets/themes/spring.png";
import summer from "../assets/themes/summer.png";
import fall from "../assets/themes/fall.png";
import winter from "../assets/themes/winter.png";
import space from "../assets/themes/space.png";
import temperate from "../assets/themes/temperate.png";
import tropical from "../assets/themes/tropical.png";
import sunset from "../assets/themes/sunset.png";

import { useEffect } from "react";

const themes = [
  pastel,
  retro,
  neon,
  gold,
  spring,
  summer,
  fall,
  winter,
  space,
  temperate,
  tropical,
  sunset,
];

// loop thru theme images and load them into browser's memory
const preloadImgs = (imgs) => {
  imgs.forEach((elmt) => {
    /* the Image constructor creates a new JavaScript Image object, which represents 
    an <img> element in memory, but it doesn’t add anything to the DOM (it’s invisible) */
    const img = new Image();
    // assigning the src property triggers the browser to download (then cache) the image
    img.src = elmt;
  });
};

function Options() {
  useEffect(() => {
    preloadImgs(themes);
  }, []);

  return (
    <div>
      <h1 className="text-9xl">Options</h1>
      <Modal />
    </div>
  );
}

export default Options;
