import Modal from "../components/Modal.jsx";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import loginUtils from "../utils/login";
const { validateInput } = loginUtils();
import Lock from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";

const ChangePassword = () => {
    const [validUsernameState, setValidUsernameState] = React.useState(null);
    const [validPasswordState, setValidPasswordState] = React.useState(null);
    const [validConfirmState, setValidConfirmState] = React.useState(null);
  return (
    <Modal
      displayTextOpenButton="Change Password!!!"
      displayTextCloseButton="clooooose"
      modalContent={
        <div className="flex flex-col">
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
                validConfirmState !== null &&
                document.getElementById("input-confirm-password").value !==
                  document.getElementById("input-password").value
              ) {
                setValidConfirmState(false);
              } else if (
                /* if creating acct/profile, and user changes password after password confirmation 
                  entry and match, pass true to confirm password state */

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
              onClick={() => {
                submitCreate(setLoggedIn);
              }}
              id="button-create-acct"
              className="mx-auto mb-5 rounded-md bg-green-600 px-4 py-1 disabled:bg-gray-50"
            >
              Submit
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default ChangePassword