import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
export default () => {
  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={false} // means to render carousel on server-side.
      infinite={true}
      autoPlay={false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      <div className="text-center"> pastel
        <img src={pastel} alt="pastel theme" />
      </div>
      <div className="text-center"> neon
        <img src={neon} alt="neon theme" />
      </div>
      <div className="text-center"> retro
        <img src={retro} alt="retro theme" />
      </div>
      <div className="text-center"> gold
        <img src={gold} alt="gold theme" />
      </div>
      <div className="text-center"> winter
        <img src={winter} alt="winter theme" />
      </div>
      <div className="text-center"> spring
        <img src={spring} alt="spring theme" />
      </div>
      <div className="text-center"> summer
        <img src={summer} alt="summer theme" />
      </div>
      <div className="text-center"> fall
        <img src={fall} alt="fall theme" />
      </div>
      <div className="text-center"> temperate
        <img src={temperate} alt="temperate theme" />
      </div>
      <div className="text-center"> tropical
        <img src={tropical} alt="tropical theme" />
      </div>
      <div className="text-center"> sunset
        <img src={sunset} alt="sunset theme" />
      </div>
      <div className="text-center"> space
        <img src={space} alt="space theme" />
      </div>
    </Carousel>
  );
};
