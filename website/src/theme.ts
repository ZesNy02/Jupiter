import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const getDarkTheme = () => {
  return createTheme(darkTheme, {
    palette: {},
  });
};
