import ProfileMenu from "./ProfileMenu.jsx";
import { ProfileContext } from "../index.jsx";

const Hero = ({ displayText }) => {
  const { isLoggedIn, setLoggedIn } = React.useContext(ProfileContext);
  return (
    <div className="flex w-full">
      <h1 className="font-machine mx-auto text-9xl">{displayText}</h1>
      {isLoggedIn && <ProfileMenu />}
    </div>
  );
};

export default Hero;
