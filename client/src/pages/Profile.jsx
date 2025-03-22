import Button from "@mui/material/Button";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import Loading from "./Loading.jsx";
import Hero from "../components/Hero.jsx";
import { ProfileContext } from "../index.jsx";
import { instanceWithInterceptor } from "../apis/interceptor.js";
import Modal from "../components/Modal.jsx";

//////////////////////////////////////////////////////
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import loginUtils from "../utils/login";
const { validateInput } = loginUtils();
import Lock from "@mui/icons-material/Lock";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//////////////////////////////////////////////////////

const Profile = () => {
  //////////////////////////////////////////////////////
  const [validUsernameState, setValidUsernameState] = React.useState(null);
  const [validPasswordState, setValidPasswordState] = React.useState(null);
  const [createAcctState, setCreateAcctState] = React.useState(false);
  const [validConfirmState, setValidConfirmState] = React.useState(null);
  //////////////////////////////////////////////////////

  const { isLoggedIn, setLoggedIn } = React.useContext(ProfileContext);
  const [serverResponse, setServerResponse] = React.useState(null);
  const navigate = useNavigate();
  // initialize a React ref to null
  const loggedInRef = React.useRef(null);

  React.useEffect(() => {
    // map 'loggedInRef' to 'isLoggedIn' state
    loggedInRef.current = isLoggedIn;
    console.log("loggedInRef.current: ", loggedInRef.current);
  }, [isLoggedIn]);

  React.useEffect(() => {
    const delayedRequest = async () => {
      /* if after 500ms there is still not a a user to reference in 'loggedInRef', 
      redirect the user to '/login' page */
      if (!loggedInRef.current) {
        return navigate("/login");
      }
      try {
        const response = await instanceWithInterceptor.get("/profile", {
          headers: {
            /* if 'isLoggedIn' state's access token is still valid when this page is accessed, 
              or the necessary amount of time has elapsed for the 'ProfileProvider' to return a new 
              access token from the '/refresh' endpoint, send the access token on the appropriate
               request header */
            Authorization: `Bearer ${loggedInRef.current[0].accessToken}`,
          },

          // attach setState function 'setLoggedIn' to request config
          setLoggedIn: setLoggedIn,

          /* `withCredentials` indicates whether or not cross-site Access-Control requests
            should be made using credentials (such as cookies, authentication headers or 
            TLS client certificates) */
          withCredentials: true,
        });
        console.log("🚩 successful axios request: ", response.data);
        setServerResponse(response.data);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    /* provide ample time for for the ProfileProvider to mount (on initial 'root' render) and 
    return a new access token from the '/refresh' endpoint if refresh token is present (and valid)
    on HTTP-only secure cookie */
    setTimeout(delayedRequest, 500);
  }, []);

  return (
    <div>
      {!serverResponse ? (
        <Loading />
      ) : (
        <div>
          <Hero displayText="profile" />
          {Object.entries(serverResponse).map(([key, val], idx) => {
            return <p key={idx}>{`${key}: ${val}`}</p>;
          })}
          <Link to="/">
            <Button className="rounded-md bg-green-600 px-4 py-1">
              Return Home
            </Button>
          </Link>

          <Modal
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
                      ? "username must be between 3 and 20 characters in length, and may consist only of letters, numbers, and non-consecutive underscores (_) and dashes (-)"
                      : ""
                  }
                  id="input-username"
                  // validate username when input loses focus
                  onBlur={() => {
                    setValidUsernameState(
                      validateInput(
                        document.getElementById("input-username").value,
                      ),
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
                      validateInput(
                        document.getElementById("input-password").value,
                      ),
                    );
                    /* if creating acct/profile, and user changes password after password confirmation 
                    entry and no longer match, pass false to confirm password state */
                    if (
                      createAcctState &&
                      validConfirmState !== null &&
                      document.getElementById("input-confirm-password")
                        .value !==
                        document.getElementById("input-password").value
                    ) {
                      setValidConfirmState(false);
                    } else if (
                      /* if creating acct/profile, and user changes password after password confirmation 
                      entry and match, pass true to confirm password state */
                      createAcctState &&
                      validConfirmState !== null &&
                      document.getElementById("input-confirm-password")
                        .value ===
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
                          document.getElementById("input-confirm-password")
                            .value ===
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
                        !(
                          validUsernameState &&
                          validPasswordState &&
                          validConfirmState
                        )
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
            }
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
