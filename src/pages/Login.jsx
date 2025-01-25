import Button from "@mui/material/Button";
import { Link } from "react-router";
///////
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";
///////

const Login = () => {
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
          id="input-with-icon-textfield"
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
          id="input-with-icon-textfield"
          label={
            <div className="flex">
              <Lock />
              <p className="ms-1">password</p>
            </div>
          }
        ></TextField>
      </div>
    </div>
  );
};

export default Login;
