import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { logout } from "../auth/logout.js";
import { ProfileContext } from "../index.jsx";

export default function BasicMenu() {
  const { isLoggedIn, setLoggedIn } = React.useContext(ProfileContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    if (event.currentTarget.id === "menuItem-logout") {
      logout(setLoggedIn);
    }
    setAnchorEl(null);
  };

  return (
    <div className="absolute right-5 self-center">
      <Button
        className="rounded-md bg-green-600 px-4 py-1"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {isLoggedIn[1]}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem divider={true} id="theID" onClick={handleClose}>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem id="menuItem-logout" onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
