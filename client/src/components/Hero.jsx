import ProfileMenu from "./ProfileMenu.jsx";

const Hero = ({displayText}) => {
  return (
    <div className="w-full flex">
      <h1 className="font-machine text-9xl mx-auto">{displayText}</h1>
      <ProfileMenu />
    </div>
  );
};

export default Hero;
