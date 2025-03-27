import { refreshToken } from "../auth/refresh.js";
/* Context lets the parent component make some information available to any component in 
the tree below it—no matter how deep—without passing it explicitly through props. */
const ProfileContext = React.createContext();
/* When you nest content inside a JSX tag, the parent component will receive that content in a 
prop called children */
const ProfileProvider = ({ children }) => {
  // can only call a Hook immediately inside a React component
  const [isLoggedIn, setLoggedIn] = React.useState(null);

  /* if (an unexpired) refresh token exists (on HTTP-only cookie), persist user's logged-in 
  state across browser refresh */
  React.useEffect(
    () => {
      refreshToken(setLoggedIn);
    },
    // only runs once ProfileProvider mounts (on initial 'root' render)
    [],
  );

  React.useEffect(() => {
    // isLoggedIn = Array --> [{accessToken: <...>}, <username>]
    console.log("🚩 logged in:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <ProfileContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {/* {children} is essential in any wrapper component that needs to dynamically render 
      content inside it */}
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileProvider, ProfileContext };
