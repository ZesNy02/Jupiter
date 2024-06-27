import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const getDarkTheme = () => {
  return createTheme(darkTheme, {
    palette: {
      background: {
        dark: "#1f1f1f",
        light: "#f2f2f2",
        gray: "#d0d0d0",
      },
    },
  });
};
