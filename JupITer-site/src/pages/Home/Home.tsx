import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import styles from "./Home.module.css";
import { useState } from "react";

const Home = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <div
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <img src="/jupiter_logo.png" alt="logo" className={styles.img} />
            </div>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, visibility: "hidden" }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
      </Drawer>
      <div>
        <div>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              borderBottom: "2px solid orange",
              width: "fit-content",
            }}
          >
            Team JupITer
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
              width: "fit-content",
            }}
          >
            und hier so 3-4 Zeilen Text über das Programm oder coole features
          </Typography>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Home;
