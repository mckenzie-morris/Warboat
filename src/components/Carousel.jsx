import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red", right: '3%', zIndex: '1' }}
      onClick={onClick}
    />
  );
}

function Carousel() {
  const settings = {
    arrows: true,
    nextArrow: <NextArrow />,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {themes.map((theme, idx) => {
          return (
            <div key={idx} className="">
              <img className="mx-auto p-5" src={theme}></img>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default Carousel;
