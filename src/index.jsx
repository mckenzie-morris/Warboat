import "./styles.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import Home from "./pages/Home.jsx";
import Game from "./pages/Game.jsx";
import Login from "./pages/Login.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import Options from "./pages/Options.jsx";
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

// IIFE for theme control
const themeControl = (() => {
  // obtain current theme (if defined)
  const theme = sessionStorage.getItem("theme");
  // obtain html's class (theme)
  const htmlElmt = document.getElementsByTagName("html")[0].classList;
  // if theme exists on session storage, and browser is reloaded, re-apply the theme to html
  if (theme && !htmlElmt.value) {
    htmlElmt.add(sessionStorage.getItem("theme"));
    return console.log(`${theme} color theme added`);
  }
  // if theme does not exist on session storage, initialize it and apply it to html
  else {
    sessionStorage.setItem("theme", "pastel");
    htmlElmt.add(sessionStorage.getItem("theme"));
    return console.log("pastel color theme initialized");
  }
})();

const root = createRoot(document.getElementById("root"));

root.render(
  /* 'injectFirst' prop injects Material library's styles at top of <head>, so that any other 
styling injected (Tailwind) after will take precedence */
  <StyledEngineProvider injectFirst>
    {/* any rendering or runtime errors will trigger fallback component to render */}
    <ErrorBoundary FallbackComponent={Fallback}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/options" element={<Options />} />
          {/* render a 404 component (NotFound) for any path not explicitly defined */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
    ,
  </StyledEngineProvider>,
);
