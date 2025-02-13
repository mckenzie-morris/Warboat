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

const Login = () => {
  const {
    createAcctState,
    setCreateAcctState,
    validUsernameState,
    setValidUsernameState,
    validPasswordState,
    setValidPasswordState,
    usernameInitState,
    setUsernameState,
    passwordInitState,
    setPasswordState,
    validConfirmState,
    setValidConfirmState,
    confirmInitState,
    setConfirmState,
  } = loginHooks();
  const { validateInput } = loginUtils();

  React.useEffect(() => {
    console.log("validUsernameState: ", validUsernameState);
    console.log("validPasswordState: ", validPasswordState);
    console.log("validConfirmState: ", validConfirmState);
    console.log("confirmInitState: ", confirmInitState);
  }, [validUsernameState, validPasswordState, validConfirmState, confirmInitState]);

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
          // change 'error' prop to a conditional (if )
          error={!usernameInitState}
          helperText={
            !validUsernameState && !usernameInitState
              ? "username must be between 3 and 20 characters in length, and may consist only of letters, numbers, and non-consecutive underscores (_) and dashes (-)"
              : ""
          }
          id="input-username"
          onBlur={() => {
            const validUsername =
              document.getElementById("input-username").value;
            setValidUsernameState(validateInput(validUsername));
            setUsernameState(validateInput(validUsername));
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
          error={!passwordInitState}
          helperText={
            !validPasswordState && !passwordInitState
              ? "password must be between 3 and 20 characters in length, and may consist only of letters, numbers, and non-consecutive underscores (_) and dashes (-)"
              : ""
          }
          id="input-password"
          onBlur={() => {
            const validPassword =
              document.getElementById("input-password").value;
            setValidPasswordState(validateInput(validPassword));
            setPasswordState(validateInput(validPassword));
            const confirmPasswordValue = document?.getElementById(
              "input-confirm-password",
            )?.value;
            if (createAcctState && (validPassword === confirmPasswordValue)) {
              setValidConfirmState(true);
            }
            else if (createAcctState && (validPassword !== confirmPasswordValue)) {
              setValidConfirmState(false);
              // setConfirmState(false)
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
              error={!confirmInitState}
              helperText={
                !validConfirmState && !confirmInitState
                  ? "must match password"
                  : ""
              }
              id="input-confirm-password"
              onBlur={() => {
                const validPassword =
                  document.getElementById("input-password").value;
                const confirmPasswordValue = document.getElementById(
                  "input-confirm-password",
                ).value;
                if (validPassword === confirmPasswordValue) {
                  setValidConfirmState(true);
                  setConfirmState(true);
                } else {
                  setValidConfirmState(false);
                  setConfirmState(false);
                }
              }}
              label={
                <div className="flex">
                  <Lock />
                  <p className="ms-1">password</p>
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
