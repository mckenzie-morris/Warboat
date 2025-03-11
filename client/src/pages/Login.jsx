import Button from "@mui/material/Button";
import { Link } from "react-router";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Hero from "../components/Hero.jsx";
import loginHooks from "../hooks/login";
import loginUtils from "../utils/login";
const { validateInput } = loginUtils();
import { useNavigate } from "react-router";
import { submitCredentials } from "../auth/login.js";
import { ProfileContext } from "../index.jsx";

const Login = () => {
  const navigate = useNavigate();

  const { isLoggedIn, setLoggedIn } = React.useContext(ProfileContext);
  React.useEffect(() => {
    if (isLoggedIn) {
      return navigate("/");
    }
  }, [isLoggedIn]);

  const {
    createAcctState,
    setCreateAcctState,
    validUsernameState,
    setValidUsernameState,
    validPasswordState,
    setValidPasswordState,
    validConfirmState,
    setValidConfirmState,
  } = loginHooks();

  return (
    <div>
      <Hero displayText="login" />
      <Link to="/">
        <Button className="rounded-md bg-green-600 px-4 py-1">
          Return Home
        </Button>
      </Link>

      <div className="mx-auto mt-5 flex w-3/5 flex-col">
        <TextField
          className="my-5"
          variant="outlined"
          // if non-valid username entered, show error outline when input loses focus
          error={validUsernameState === false}
          helperText={
            // if non-valid username entered, show helper text
            validUsernameState === false
              ? "username must be between 3 and 20 characters in length, and may consist only of letters, numbers, and non-consecutive underscores (_) and dashes (-)"
              : ""
          }
          id="input-username"
          // validate username when input loses focus
          onBlur={() => {
            setValidUsernameState(
              validateInput(document.getElementById("input-username").value),
            );
          }}
          label={
            <div className="flex">
              <AccountCircle />
              <p className="ms-1">username</p>
            </div>
          }
        ></TextField>

        <TextField
          className="my-5"
          variant="outlined"
          // if non-valid password entered, show error outline when input loses focus
          error={validPasswordState === false}
          // if non-valid password entered, show helper text
          helperText={
            validPasswordState === false
              ? "password must be between 3 and 20 characters in length, and may consist only of letters, numbers, and non-consecutive underscores (_) and dashes (-)"
              : ""
          }
          id="input-password"
          // validate password when input loses focus
          onBlur={() => {
            setValidPasswordState(
              validateInput(document.getElementById("input-password").value),
            );
            /* if creating acct/profile, and user changes password after password confirmation 
            entry and no longer match, pass false to confirm password state */
            if (
              createAcctState &&
              validConfirmState !== null &&
              document.getElementById("input-confirm-password").value !==
                document.getElementById("input-password").value
            ) {
              setValidConfirmState(false);
            } else if (
              /* if creating acct/profile, and user changes password after password confirmation 
            entry and match, pass true to confirm password state */
              createAcctState &&
              validConfirmState !== null &&
              document.getElementById("input-confirm-password").value ===
                document.getElementById("input-password").value
            ) {
              setValidConfirmState(true);
            }
          }}
          label={
            <div className="flex">
              <Lock />
              <p className="ms-1">password</p>
            </div>
          }
        ></TextField>
        {/* if create acct checkbox NOT checked, show login button */}
        {!createAcctState && (
          // if username and password are valid, enable button
          <Button
            disabled={!(validUsernameState && validPasswordState)}
            id="button-login"
            onClick={() => {
              submitCredentials(setLoggedIn);
            }}
            className="mx-auto mb-5 rounded-md bg-green-600 px-4 py-1 disabled:bg-gray-50"
          >
            Submit
          </Button>
        )}
        {/* if create acct checkbox NOT checked, show login button */}
        {createAcctState && (
          <div className="flex flex-col">
            <TextField
              className="my-5"
              variant="outlined"
              /* if non-valid confirmation password entered, show error outline when 
              input loses focus */
              error={validConfirmState === false}
              // if non-valid confirmation password entered, show helper text
              helperText={
                validConfirmState === false ? "must match password" : ""
              }
              id="input-confirm-password"
              // validate confirmation password when input loses focus
              onBlur={() => {
                if (
                  document.getElementById("input-confirm-password").value ===
                  document.getElementById("input-password").value
                ) {
                  setValidConfirmState(true);
                } else setValidConfirmState(false);
              }}
              label={
                <div className="flex">
                  <Lock />
                  <p className="ms-1">re-enter password</p>
                </div>
              }
            ></TextField>
            {/* if username, password, and confirmation password are valid, enable button */}
            <Button
              disabled={
                !(validUsernameState && validPasswordState && validConfirmState)
              }
              id="button-create-acct"
              className="mx-auto mb-5 rounded-md bg-green-600 px-4 py-1 disabled:bg-gray-50"
            >
              Submit
            </Button>
          </div>
        )}

        <FormGroup>
          <FormControlLabel
            className="mx-auto"
            control={
              <Checkbox
                id="input-create-account"
                onChange={(event) => {
                  setCreateAcctState(event.target.checked);
                }}
              />
            }
            label="Don't have an account? Sign up!"
            labelPlacement="top"
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default Login;
