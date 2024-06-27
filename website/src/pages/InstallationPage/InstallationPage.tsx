import { Box, Link, List, ListItem, Paper, Typography } from "@mui/material";
import { FC } from "react";
import "./InstallationPage.css";

interface InstallationPageProps {}

const InstallationPage: FC<InstallationPageProps> = ({}) => {
  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Installations Anleitung
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: "1.5rem", px: "10%", textAlign: "center" }}
      >
        Willkommen zur Installationsanleitung für Chaty, deinem neuen Chatbot
        für die Prooph-Board App. Bitte folge den unten stehenden Schritten, um
        Chaty erfolgreich zu installieren und in Betrieb zu nehmen.
      </Typography>
      <Paper
        sx={{
          backgroundColor: "background.light",
          width: "100%",
          m: "0",
          "& .MuiTypography-root": {
            textAlign: "center",
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "background.gray",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: "1rem",
            px: "5rem",
          }}
        >
          <Typography variant="h4">Client-Installation</Typography>
          <List
            sx={{
              "& li": {
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            <ListItem>
              <Typography variant="body1">
                1. Lade die{" "}
                <Link href="https://www.tampermonkey.net/">
                  Tampermonkey Extension
                </Link>{" "}
                für deinen Browser herunter und installiere sie.
              </Typography>
            </ListItem>
            <ListItem>
              <img
                className="installation-image"
                src="/installation/monkey_extension.jpg"
                alt=""
              />
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                2. Öffne das Tampermonkey Dashboard in deinem Browser.
              </Typography>
            </ListItem>
            <ListItem>
              <img
                className="installation-image"
                src="/installation/monkey_menu.jpg"
                alt=""
              />
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                3. Erstelle ein neues Userscript im Tampermonkey Dashboard.
              </Typography>
            </ListItem>
            <ListItem>
              <img
                className="installation-image"
                src="/installation/monkey_dashboard.jpg"
                alt=""
              />
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                4. Kopiere das Script von{" "}
                <Link href="https://github.com/ZesNy02/Jupiter/blob/main/Frontend/Tampermonkey/script.js">
                  hier
                </Link>{" "}
                und füge es in das neue Userscript ein.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                5. Im Script findest du ganz oben eine Konstante namens
                BASE_SERVER_URL. Ersetze diesen Wert durch die URL deines
                Servers.
              </Typography>
            </ListItem>
            <ListItem>
              <img
                className="installation-image"
                src="/installation/monkey_change-url.jpg"
                alt=""
              />
            </ListItem>
          </List>
        </Box>
        <Box
          sx={{
            backgroundColor: "background.light",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: "1rem",
          }}
        >
          <Typography variant="h4">Server-Installation</Typography>
          <Typography variant="h5">Voraussetzungen</Typography>
          <List>
            <ListItem>
              <Typography variant="body1">
                1. Ollama Server mit LLaMA3 und mxbai-embed-large
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                2. Postgres Datenbank mit der Vector Extension
              </Typography>
            </ListItem>
          </List>
          <Typography variant="h5">
            Installation mit Docker (empfohlen)
          </Typography>
          <List
            sx={{
              "& li": {
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            <ListItem>
              <Typography variant="body1">
                - Docker Compose: Für eine schnelle und einfache Installation
                ist eine Beispiel Docker Compose Datei{" "}
                <Link href="https://github.com/ZesNy02/Jupiter/blob/main/Backend/rust-server/example_compose.yml">
                  hier
                </Link>{" "}
                verfügbar.
              </Typography>
            </ListItem>
            <ListItem>
              <img
                className="installation-image"
                src="/installation/example_compose.jpg"
                alt=""
              />
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                - Das Docker Image ist auf Docker Hub verfügbar unter den Namen{" "}
                <b>devtonka/chaty-server</b>.
              </Typography>
            </ListItem>
          </List>
          <Typography variant="h5">
            Native Installation (nicht empfohlen)
          </Typography>
          <List
            sx={{
              "& li": {
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            <ListItem>
              <Typography variant="body1">
                1. Installiere{" "}
                <Link href="https://www.rust-lang.org/">Rust</Link> auf deinem
                Server.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                2. Installiere{" "}
                <Link href="https://www.python.org/">Python</Link> auf deinem
                Server. (Mindestens Version 3.10.12)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                3. Klone das{" "}
                <Link href="https://github.com/ZesNy02/Jupiter/tree/main">
                  Chaty Repository
                </Link>{" "}
                auf deinen Server.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                4. Wechsle in den <b>rust-server</b> Ordner innerhalb des
                geklonten Repositories.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                5. Führe entweder das <b>linux_setup.sh</b> oder das{" "}
                <b>windows_setup.bat</b> Script aus, je nachdem welches
                Betriebssystem du verwendest.
              </Typography>
            </ListItem>
            <ListItem>
              <img
                className="installation-image"
                src="/installation/setupscript_example.jpg"
                alt=""
              />
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                6. Erstelle eine <b>.env</b> Datei im <b>rust-server</b> Ordner.
                (rust-server/.env)
              </Typography>
            </ListItem>
            <ListItem>
              <img
                className="installation-image"
                src="/installation/dotenv_example.jpg"
                alt=""
              />
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                7. Starte den Server mit <b>cargo run</b>.
              </Typography>
            </ListItem>
            <ListItem>
              <img
                className="installation-image"
                src="/installation/cargo_run.jpg"
                alt=""
              />
            </ListItem>
          </List>
        </Box>
      </Paper>
    </>
  );
};

export default InstallationPage;
