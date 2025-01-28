import Button from "@mui/material/Button";
import { Link } from "react-router";
///////
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";
///////
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const Login = () => {
  const [createAcctState, setCreateAcctState] = React.useState(false);
  console.log(createAcctState);
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
          error={false}
          helperText="Incorrect entry."
          id="input-username"
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
          error={false}
          helperText="Incorrect entry."
          id="input-password"
          label={
            <div className="flex">
              <Lock />
              <p className="ms-1">password</p>
            </div>
          }
        ></TextField>
        {createAcctState && (
          <div className="flex flex-col">
            <TextField
              className="my-5"
              variant="outlined"
              error={false}
              helperText="Incorrect entry."
              id="input-confirm-password"
              label={
                <div className="flex">
                  <Lock />
                  <p className="ms-1">password</p>
                </div>
              }
            ></TextField>
            <Button className="mx-auto mb-5 rounded-md bg-green-600 px-4 py-1">
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
