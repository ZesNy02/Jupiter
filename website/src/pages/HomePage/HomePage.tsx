import { FC } from "react";
import "./HomePage.css";
import { Box, Grid, Typography } from "@mui/material";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: "background.dark",
          color: "#fff",
          gap: "10rem",
          zIndex: -1,
        }}
      >
        <div className="css-background" />
        <Box>
          <Typography variant="h2">Willkommen zu Chaty!</Typography>
          <Typography variant="body1" sx={{ fontSize: "2rem" }}>
            Der neue Chatbot für das Prooph-Board
          </Typography>
        </Box>

        <Grid
          container
          spacing={2}
          sx={{
            p: "4rem",
            gap: "4rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h3">Was ist das Prooph-Board?</Typography>
            <Typography variant="body1">
              Mit dem von Prooph Software GmbH entwickelten Prooph Board kann
              Jedermann Event-Streams und Prozesse, die zentrale Bestandteile
              von Event-getriebenen Anwendungen sind, effizient und remote im
              Team planen.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <img
              className="home-image"
              src="/start-header/macbook-example.png"
              alt=""
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{
            p: "4rem",
            gap: "4rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            sx={{
              order: { xs: 2, sm: 2, md: 1 }, // Image comes second on xs and sm, first on md and up
            }}
          >
            <img
              className="home-image"
              src="/start-header/chaty-window.jpg"
              alt=""
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              order: { xs: 1, sm: 1, md: 2 },
            }}
          >
            <Typography variant="h3">
              Chaty – der Chatbot für das Prooph Board!
            </Typography>
            <Typography variant="body1">
              Wir freuen uns, Ihnen unseren neuesten Chatbot vorstellen zu
              dürfen – Chaty – ein Werkzeug, das die Nutzung des Prooph Boards
              vereinfachen wird. Unser Chatbot ist darauf ausgelegt, Ihnen bei
              Verständnisfragen zu helfen, die Funktionen des Prooph Boards zu
              erklären und Sie beim Event Storming zu unterstützen!
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{
            p: "4rem",
            gap: "4rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h3">Warum dieses Projekt?</Typography>
            <Typography variant="body1">
              Im Sommersemester 2024 erhielt das Team Jupiter der Hochschule
              Mannheim den Auftrag von bitExpert, eine künstliche Intelligenz in
              das Prooph-Board zu integrieren. Sie entwickelten dafür den
              Chatbot "Chaty", der Nutzern bei Fragen und Problemen rund um
              Event Sourcing unterstützt. Chaty verbessert die
              Benutzerfreundlichkeit des Prooph-Boards erheblich, indem er
              schnelle und effiziente Hilfe bietet.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <img
              className="home-image"
              src="/start-header/group-picture.jpg"
              alt=""
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HomePage;
