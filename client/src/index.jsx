import "./styles.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import Home from "./pages/Home.jsx";
import Game from "./pages/Game.jsx";
import Login from "./pages/Login.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import Options from "./pages/Options.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";
/* effect change to where mui/material styles are injected in HTML doc (at bottom by 
default, therefore material library's styles take precedence) */
import { StyledEngineProvider } from "@mui/material/styles";

// catch errors and render a fallback
const Fallback = ({ error }) => {
  return (
    <div>
      <h1>Uh-oh! Something went wrong:</h1>
      <p>{error.message}</p>
    </div>
  );
};

/* Context lets the parent component make some information available to any component in 
the tree below it—no matter how deep—without passing it explicitly through props. */
const ProfileContext = React.createContext();
/* When you nest content inside a JSX tag, the parent component will receive that content in a 
prop called children */
const ProfileProvider = ({ children }) => {
  // can only call a Hook immediately inside a React component
  const [isLoggedIn, setLoggedIn] = React.useState(null);
  return (
    <ProfileContext.Provider value={{isLoggedIn, setLoggedIn}}>
      {/* {children} is essential in any wrapper component that needs to dynamically render 
      content inside it */}
      {children}
    </ProfileContext.Provider>
  );
};

import { themeControl } from "./utils/index.js";

const root = createRoot(document.getElementById("root"));

root.render(
  /* 'injectFirst' prop injects Material library's styles at top of <head>, so that any other 
styling injected (Tailwind) after will take precedence */
  <StyledEngineProvider injectFirst>
    {/* any rendering or runtime errors will trigger fallback component to render */}
    <ErrorBoundary FallbackComponent={Fallback}>
      <BrowserRouter>
        <ProfileProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/options" element={<Options />} />
            <Route path="/profile" element={<Profile />} />
            {/* render a 404 component (NotFound) for any path not explicitly defined */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ProfileProvider>
      </BrowserRouter>
    </ErrorBoundary>
    ,
  </StyledEngineProvider>,
);

export { ProfileContext };
