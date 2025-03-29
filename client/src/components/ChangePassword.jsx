import Modal from "../components/Modal.jsx";
import TextField from "@mui/material/TextField";
import loginUtils from "../utils/login";
const { validateInput } = loginUtils();
import Lock from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import changePassword from "../auth/changePassword.js";
import { ProfileContext } from "../index.jsx";

const ChangePassword = () => {
  const { isLoggedIn, setLoggedIn } = React.useContext(ProfileContext);
  const [validPasswordState, setValidPasswordState] = React.useState(null);
  const [validNewPasswordState, setValidNewPasswordState] =
    React.useState(null);
  const [validConfirmState, setValidConfirmState] = React.useState(null);
  const [alternativeContentState, setAlternativeContentState] =
    React.useState(null);
  const [closeModalState, setCloseModalState] = React.useState(false);
  const [openOrClosedState, setOpenOrClosedState] = React.useState(false);

  React.useEffect(() => {
    if (openOrClosedState) {
      setValidPasswordState(null);
      setValidNewPasswordState(null);
      setValidConfirmState(null);
    }
  }, [openOrClosedState]);

  return (
    <Modal
      openOrClosed={setOpenOrClosedState}
      alternativeContent={alternativeContentState}
      closeCondition={closeModalState}
      displayTextOpenButton="Change Password!!!"
      displayTextCloseButton="clooooose"
      modalContent={
        <div className="flex flex-col">
          <TextField
            className="my-5"
            variant="outlined"
            // if non-valid username entered, show error outline when input loses focus
            error={validPasswordState === false}
            helperText={
              // if non-valid username entered, show helper text
              validPasswordState === false
                ? "password field may not be blank"
                : ""
            }
            id="input-password"
            // validate username when input loses focus
            onBlur={() => {
              if (
                validNewPasswordState !== null &&
                document.getElementById("input-NewPassword").value ===
                  document.getElementById("input-password").value
              ) {
                setValidNewPasswordState(false);
              }

              if (
                validNewPasswordState !== null &&
                document.getElementById("input-NewPassword").value !==
                  document.getElementById("input-password").value &&
                setValidNewPasswordState(
                  validateInput(
                    document.getElementById("input-NewPassword").value,
                  ),
                )
              ) {
                setValidNewPasswordState(true);
              }

              if (!document.getElementById("input-password").value) {
                return setValidPasswordState(false);
              } else return setValidPasswordState(true);
            }}
            label={
              <div className="flex">
                <Lock />
                <p className="ms-1">old password</p>
              </div>
            }
          ></TextField>
          <TextField
            className="my-5"
            variant="outlined"
            // if non-valid password entered, show error outline when input loses focus
            error={validNewPasswordState === false}
            // if non-valid password entered, show helper text
            helperText={
              validNewPasswordState === false
                ? "new password must be between 3 and 20 characters in length, may consist only of letters, numbers, and non-consecutive underscores (_) and dashes (-), and may not match the old password"
                : ""
            }
            id="input-NewPassword"
            // validate password when input loses focus
            onBlur={() => {
              setValidNewPasswordState(
                validateInput(
                  document.getElementById("input-NewPassword").value,
                ),
              );
              if (
                validPasswordState !== null &&
                document.getElementById("input-password").value ===
                  document.getElementById("input-NewPassword").value
              ) {
                setValidNewPasswordState(false);
              } else if (
                /* if changing password, and user changes new password after new password confirmation 
                entry and no longer match, pass false to confirm new password state */
                validConfirmState !== null &&
                document.getElementById("input-confirm-newPassword").value !==
                  document.getElementById("input-NewPassword").value
              ) {
                setValidConfirmState(false);
              } else if (
                /* if changing password, and user changes new password after new password confirmation 
                  entry and match, pass true to confirm new password state */
                validConfirmState !== null &&
                document.getElementById("input-confirm-newPassword").value ===
                  document.getElementById("input-NewPassword").value
              ) {
                setValidConfirmState(true);
              }
            }}
            label={
              <div className="flex">
                <Lock />
                <p className="ms-1">new password</p>
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
                validConfirmState === false ? "must match new password" : ""
              }
              id="input-confirm-newPassword"
              // validate confirmation password when input loses focus
              onBlur={() => {
                if (
                  document.getElementById("input-confirm-newPassword").value ===
                  document.getElementById("input-NewPassword").value
                ) {
                  setValidConfirmState(true);
                } else setValidConfirmState(false);
              }}
              label={
                <div className="flex">
                  <Lock />
                  <p className="ms-1">re-enter new password</p>
                </div>
              }
            ></TextField>
            {/* if username, password, and confirmation password are valid, enable button */}
            <Button
              disabled={
                !(
                  validPasswordState &&
                  validNewPasswordState &&
                  validConfirmState
                )
              }
              onClick={async () => {
                const serverRes = await changePassword(
                  isLoggedIn[0].accessToken,
                  setLoggedIn,
                );
                setAlternativeContentState((<h1 className="text-9xl">{serverRes}</h1>));
                setCloseModalState(false);
                setTimeout(() => {
                  setAlternativeContentState(null);
                  setCloseModalState(false);
                }, 2500);
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

export default ChangePassword;
