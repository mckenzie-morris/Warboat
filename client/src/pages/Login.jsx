import Button from "@mui/material/Button";
import { Link } from "react-router";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import loginHooks from "../hooks/login";
import loginUtils from "../utils/login";
const { validateInput } = loginUtils();

const Login = () => {
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
      <h1 className="text-9xl">Login</h1>
      <Link to="/">
        <Button className="rounded-md bg-green-600 px-4 py-1">
          Return Home
        </Button>
      </Link>

      <div className="mx-auto mt-5 flex w-3/5 flex-col">
        <TextField
          className="my-5"
          variant="outlined"
          error={validUsernameState === false}
          helperText={
            validUsernameState === false
              ? "username must be between 3 and 20 characters in length, and may consist only of letters, numbers, and non-consecutive underscores (_) and dashes (-)"
              : ""
          }
          id="input-username"
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
          error={validPasswordState === false}
          helperText={
            validPasswordState === false
              ? "username must be between 3 and 20 characters in length, and may consist only of letters, numbers, and non-consecutive underscores (_) and dashes (-)"
              : ""
          }
          id="input-password"
          onBlur={() => {
            setValidPasswordState(
              validateInput(document.getElementById("input-password").value),
            );
            if (
              createAcctState &&
              validConfirmState !== null &&
              document.getElementById("input-confirm-password").value !==
                document.getElementById("input-password").value
            ) {
              setValidConfirmState(false);
            } else if (
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
        {!createAcctState && (
          <Button
            disabled={!(validUsernameState && validPasswordState)}
            id="button-login"
            className="mx-auto mb-5 rounded-md bg-green-600 px-4 py-1 disabled:bg-gray-50"
          >
            Submit
          </Button>
        )}

        {createAcctState && (
          <div className="flex flex-col">
            <TextField
              className="my-5"
              variant="outlined"
              error={validConfirmState === false}
              helperText={
                validConfirmState === false ? "must match password" : ""
              }
              id="input-confirm-password"
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
