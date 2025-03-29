import Modal from "../components/Modal.jsx";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";

const DeleteProfile = () => {
  const [validUsernameState, setValidUsernameState] = React.useState(null);
  const [validPasswordState, setValidPasswordState] = React.useState(null);
  const [alternativeContentState, setAlternativeContentState] =
    React.useState(null);

  return (
    <Modal
      alternativeContent={alternativeContentState}
      displayTextOpenButton="Delete Account!!!"
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
                ? "username field may not be blank"
                : ""
            }
            id="input-username"
            // validate username when input loses focus
            onBlur={() => {
              if (!document.getElementById("input-username").value) {
                return setValidUsernameState(false);
              } else return setValidUsernameState(true);
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
          <Button
            disabled={!(validUsernameState && validPasswordState)}
            id="button-login"
            onClick={() => {
              setAlternativeContentState(
                <>
                  <h1>Are you sure want to delete your account?</h1>
                  <Button
                  className="mx-auto mb-5 rounded-md bg-green-600 px-4 py-1 disabled:bg-gray-50"
                  onClick={() => {

                  }}
                  >Forget it</Button>
                                    <Button
                 className="mx-auto mb-5 rounded-md bg-red-600 px-4 py-1 disabled:bg-gray-50"
                  onClick={() => {
                    
                  }}
                  >Delete it fam</Button>
                </>,
              );
            }}
            className="mx-auto mb-5 rounded-md bg-green-600 px-4 py-1 disabled:bg-gray-50"
          >
            Submit
          </Button>
        </div>
      }
    ></Modal>
  );
};

export default DeleteProfile;
