import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const getDarkTheme = () => {
  return createTheme(darkTheme, {
    palette: {},
  });
};
