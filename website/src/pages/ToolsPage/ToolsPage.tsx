import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Paper,
  Container,
  Box,
  Link,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import ChatIcon from "@mui/icons-material/Chat";
import DescriptionIcon from "@mui/icons-material/Description";
import BuildIcon from "@mui/icons-material/Build";
import "./ToolsPage.css";

const toolCategories = [
  {
    name: "IDE",
    icon: <CodeIcon />,
    tools: [
      {
        name: "Visual Studio Code",
        icon: "/icon-pics/vsc.svg",
        link: "https://code.visualstudio.com/",
      },
      {
        name: "IntelliJ IDEA",
        icon: "/icon-pics/intellij.svg",
        link: "https://www.jetbrains.com/idea/",
      },
    ],
  },
  {
    name: "Organisation und Kommunikation",
    icon: <ChatIcon />,
    tools: [
      {
        name: "GitHub",
        icon: "/icon-pics/github.svg",
        link: "https://github.com/",
      },
      {
        name: "Discord",
        icon: "/icon-pics/discord.svg",
        link: "https://discord.com/",
      },
      {
        name: "Clockify",
        icon: "/icon-pics/clockify.svg",
        link: "https://clockify.me/",
      },
      {
        name: "Microsoft Teams",
        icon: "/icon-pics/teams.svg",
        link: "https://www.microsoft.com/en-us/microsoft-teams/log-in",
      },
    ],
  },
  {
    name: "Dokumente",
    icon: <DescriptionIcon />,
    tools: [
      {
        name: "Google Docs",
        icon: "/icon-pics/docs.svg",
        link: "https://www.google.com/docs/about/",
      },
      {
        name: "Google Sheets",
        icon: "/icon-pics/sheets.svg",
        link: "https://workspace.google.com/products/sheets/",
      },
      {
        name: "Google Slides",
        icon: "/icon-pics/slides.svg",
        link: "https://workspace.google.com/products/slides/",
      },
    ],
  },
  {
    name: "Sonstige",
    icon: <BuildIcon />,
    tools: [
      {
        name: "Figma",
        icon: "/icon-pics/figma.svg",
        link: "https://www.figma.com/",
      },
      {
        name: "Docker",
        icon: "/icon-pics/docker.svg",
        link: "https://www.docker.com/",
      },
      {
        name: "Drawio",
        icon: "/icon-pics/drawio.svg",
        link: "https://www.drawio.com/",
      },
    ],
  },
];

function ToolsGrid() {
  return (
    <Box sx={{ pb: 4 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{ my: 4 }}
        >
          Tools
        </Typography>
        <Grid container spacing={3}>
          {toolCategories.map((category) => (
            <Grid item xs={12} sm={6} key={category.name}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  display="flex"
                  alignItems="center"
                >
                  {category.icon}
                  <span className="category-name">{category.name}</span>
                </Typography>
                <List dense>
                  {category.tools.map((tool) => (
                    <ListItem key={tool.name}>
                      <ListItemIcon>
                        <img
                          src={tool.icon}
                          alt={tool.name}
                          className="tool-icon"
                        />
                      </ListItemIcon>
                      <Link href={tool.link}>{tool.name}</Link>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ToolsGrid;
