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
function Fallback({ error }) {
  return (
    <div>
      <h1>Uh-oh! Something went wrong:</h1>
      <p>{error.message}</p>
    </div>
  );
}

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

/* React components can throw runtime errors for various reasons:

1.) A missing prop causes a bug.
2.) A component tries to access undefined data.
3.) Third-party libraries malfunction.

Without error boundaries, such errors would cause the whole app to crash, 
leaving the user with a blank screen or a console error. */
