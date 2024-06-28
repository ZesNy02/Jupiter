import { FC } from "react";
import "./HomePage.css";
import { Box, Typography } from "@mui/material";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
  return (
    <>
      <div className="css-background" />
      <Box>
        <Typography variant="h1">Willkommen bei Chaty!</Typography>
        <Box>
          <img className="" src="" alt="" />
          <Box>
            <Typography variant="h3">Was ist das Prooph-Board?</Typography>
            <Typography variant="body1">
              Mit dem von Prooph Software GmbH entwickelten Prooph Board kann
              Jedermann Event-Streams und Prozesse, die zentrale Bestandteile
              von Event-getriebenen Anwendungen sind, effizient und remote im
              Team planen.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
