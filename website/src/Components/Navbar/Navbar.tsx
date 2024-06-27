import { AppBar, IconButton } from "@mui/material";
import { FC } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <>
      <AppBar position="static">
        <div className="appbar-container">
          <img className="logo" src="/logo.png" alt="logo" />
          <IconButton>
            <MenuRoundedIcon />
          </IconButton>
        </div>
      </AppBar>
    </>
  );
};

export default Navbar;
