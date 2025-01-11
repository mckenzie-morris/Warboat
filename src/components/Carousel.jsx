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

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        right: "3%",
        zIndex: "1",
        scale: "2",
        translate: "0 100%",
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        left: "3%",
        zIndex: "1",
        scale: "2",
        translate: "0 100%",
      }}
      onClick={onClick}
    />
  );
};

const Carousel = () => {
  const settings = {
    // defers loading images until necessary, as opposed to all at once upon rendering the carousel
    lazyLoad: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // center current slide
    centerMode: true,
    centerPadding: "0px",
    dots: true,
    // enable scrollable via dragging on desktop
    draggable: false,
    // go to slide on click
    focusOnSelect: true,
    infinite: true,
    // animation speed in milliseconds
    speed: 500,
    // how many slides to show in one frame
    slidesToShow: 5,
    // how many slides to scroll at once
    slidesToScroll: 1,
    initialSlide: 0,
    // customize based on breakpoints
    responsive: [
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
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
        {/* iterate through array of themes */}
        {themes.map((theme, idx) => {
          return (
            <div key={idx}>
              <h1 className="mt-5 text-center">
                {/* pull name of theme from src */}
                {theme.replace(/^\/|\.png$/g, "")}
              </h1>
              <img
                // when img is clicked, change theme to corresponding img
                onClick={() => {
                  // obtain html's class (theme)
                  const htmlElmt =
                    document.getElementsByTagName("html")[0].classList;
                  // obtain the array elmt (theme) corresponding to the clicked img
                  const clickedTheme = themes[idx].replace(/^\/|\.png$/g, "");
                  /* if the clicked theme does not match the html's theme, make necessary changes 
                  to html class list and session storage */
                  if (clickedTheme !== htmlElmt[0]) {
                    htmlElmt.replace(htmlElmt, clickedTheme);
                    sessionStorage.setItem("theme", clickedTheme);
                    console.log(`color theme switched to ${clickedTheme}`);
                  }
                }}
                className="clickable-theme mx-auto p-5 hover:cursor-pointer"
                src={theme}
              ></img>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Carousel;
