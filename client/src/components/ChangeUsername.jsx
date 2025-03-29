import Modal from "../components/Modal.jsx";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import loginUtils from "../utils/login";
const { validateInput } = loginUtils();
import Lock from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import changeUsername from "../auth/changeUsername.js";
import { ProfileContext } from "../index.jsx";

const ChangeUsername = () => {
  const { isLoggedIn, setLoggedIn } = React.useContext(ProfileContext);
  const [validUsernameState, setValidUsernameState] = React.useState(null);
  const [validPasswordState, setValidPasswordState] = React.useState(null);
  const [validConfirmState, setValidConfirmState] = React.useState(null);
  const [alternativeContentState, setAlternativeContentState] = React.useState(null);
  const [closeModalState, setCloseModalState] = React.useState(false);
  const [openOrClosedState, setOpenOrClosedState] = React.useState(false);

  React.useEffect(() => {
    if (openOrClosedState) {
      setValidUsernameState(null)
      setValidPasswordState(null)
      setValidConfirmState(null)
    }
  }, [openOrClosedState])

  return (
    <Modal
      openOrClosed={setOpenOrClosedState}
      alternativeContent={alternativeContentState}
      closeCondition={closeModalState}
      displayTextOpenButton="Change Username!!!"
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
                ? "new username must be between 3 and 20 characters in length, and may consist only of letters, numbers, and non-consecutive underscores (_) and dashes (-)"
                : ""
            }
            id="input-NewUsername"
            // validate username when input loses focus
            onBlur={() => {
              setValidUsernameState(
                validateInput(
                  document.getElementById("input-NewUsername").value,
                ),
              );
              /* if changing username, and user changes new username after new username confirmation 
                  entry and no longer match, pass false to confirm new username state */
              if (
                validConfirmState !== null &&
                document.getElementById("input-confirm-NewUsername").value !==
                  document.getElementById("input-NewUsername").value
              ) {
                setValidConfirmState(false);
              } else if (
                /* if changing username, and user changes new username after new username confirmation 
                  entry and they match, pass true to confirm new username state */

                validConfirmState !== null &&
                document.getElementById("input-confirm-NewUsername").value ===
                  document.getElementById("input-NewUsername").value
              ) {
                setValidConfirmState(true);
              }
            }}
            label={
              <div className="flex">
                <AccountCircle />
                <p className="ms-1">new username</p>
              </div>
            }
          ></TextField>
          <TextField
            className="my-5"
            variant="outlined"
            /* if non-valid confirmation new username entered, show error outline when 
                  input loses focus */
            error={validConfirmState === false}
            // if non-valid confirmation new username entered, show helper text
            helperText={
              validConfirmState === false ? "must match new username" : ""
            }
            id="input-confirm-NewUsername"
            // validate confirmation new username when input loses focus
            onBlur={() => {
              if (
                document.getElementById("input-confirm-NewUsername").value ===
                document.getElementById("input-NewUsername").value
              ) {
                setValidConfirmState(true);
              } else setValidConfirmState(false);
            }}
            label={
              <div className="flex">
                <Lock />
                <p className="ms-1">re-enter new username</p>
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
                ? "password field may not be blank"
                : ""
            }
            id="input-password"
            // validate password when input loses focus
            onBlur={() => {
              if (!document.getElementById("input-password").value) {
                return setValidPasswordState(false);
              } else return setValidPasswordState(true);
            }}
            label={
              <div className="flex">
                <Lock />
                <p className="ms-1">password</p>
              </div>
            }
          ></TextField>

          <div className="flex flex-col">
            {/* if username, password, and confirmation password are valid, enable button */}
            <Button
              disabled={
                !(validUsernameState && validConfirmState && validPasswordState)
              }
              onClick={async () => {
                const serverRes = await changeUsername(
                  isLoggedIn[0].accessToken,
                  setLoggedIn,
                );
                setAlternativeContentState((<h1 className="text-9xl">{serverRes}</h1>));
                setCloseModalState(false)
                setTimeout(() => {
                  setAlternativeContentState(null)
                  setCloseModalState(true);
                }, 2500);
              }}
              id="button-change-username"
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

export default ChangeUsername;
