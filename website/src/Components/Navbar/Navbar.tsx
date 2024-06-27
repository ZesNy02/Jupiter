import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FC, useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import "./Navbar.css";
import { useLocation } from "react-router-dom";

interface NavbarProps {}

const routes = [
  { route: "/", name: "Home" },
  { route: "/about", name: "About" },
  { route: "/documents", name: "Documents" },
  { route: "/installation", name: "Installation" },
];

const Navbar: FC<NavbarProps> = ({}) => {
  const [drawerState, setDrawerState] = useState(false);
  const location = useLocation();

  const openDrawer = () => {
    setDrawerState(true);
  };

  const closeDrawer = () => {
    setDrawerState(false);
  };

  const getSelectedPage = (path: string) => {
    if (path === location.pathname) {
      return { color: "primary.main" };
    } else {
      return { color: "primary.text" };
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{ padding: "0 0.5rem" }}>
        <div className="appbar-container">
          <img className="logo" src="/logo_weiss.png" alt="logo" />
          <IconButton
            sx={{ aspectRatio: 1, height: "3rem" }}
            onClick={openDrawer}
          >
            <MenuRoundedIcon />
          </IconButton>
        </div>
      </AppBar>
      <Drawer open={drawerState} onClose={closeDrawer} anchor="right">
        <Box sx={{ width: "25rem" }}>
          <List>
            {routes.map((route, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={getSelectedPage(route.route)}
              >
                <ListItemButton href={route.route}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText>{route.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
