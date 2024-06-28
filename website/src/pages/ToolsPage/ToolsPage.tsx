import { 
  Grid, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Typography,
  Paper,
  Container,
  Box
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import ChatIcon from '@mui/icons-material/Chat';
import DescriptionIcon from '@mui/icons-material/Description';
import BuildIcon from '@mui/icons-material/Build';
import "./ToolsPage.css";

import visualstudiocode from '/icon-pics/vsc.svg';
import intellij from '/icon-pics/intellij.svg';
import github from '/icon-pics/github.svg';
import discord from '/icon-pics/discord.svg';
import teams from '/icon-pics/teams.svg';
import googleDocs from '/icon-pics/docs.svg';
import googleSheets from '/icon-pics/sheets.svg';
import googleSlides from '/icon-pics/slides.svg';
import figma from '/icon-pics/figma.svg';
import docker from '/icon-pics/docker.svg';
import clockify from '/icon-pics/clockify.svg';
import drawio from '/icon-pics/drawio.svg';

const toolCategories = [
  {
    name: 'IDE',
    icon: <CodeIcon />,
    tools: [
      { name: 'Visual Studio Code', icon: visualstudiocode },
      { name: 'IntelliJ IDEA', icon: intellij },
    ]
  },
  {
    name: 'Organisation und Kommunikation',
    icon: <ChatIcon />,
    tools: [
      { name: 'GitHub', icon: github },
      { name: 'Discord', icon: discord },
      { name: 'Clockify', icon: clockify },
      { name: 'Microsoft Teams', icon: teams },
    ]
  },
  {
    name: 'Dokumente',
    icon: <DescriptionIcon />,
    tools: [
      { name: 'Google Docs', icon: googleDocs },
      { name: 'Google Sheets', icon: googleSheets },
      { name: 'Google Slides', icon: googleSlides },
    ]
  },
  {
    name: 'Sonstige',
    icon: <BuildIcon />,
    tools: [
      { name: 'Figma', icon: figma },
      { name: 'Docker', icon: docker },
      { name: 'Drawio', icon: drawio },
    ]
  }
];

function ToolsGrid() {
  return (
    <Box sx={{ pb: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ my: 4 }}>
          Tools
        </Typography>
        <Grid container spacing={3}>
          {toolCategories.map((category) => (
            <Grid item xs={12} sm={6} key={category.name}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h5" gutterBottom display="flex" alignItems="center">
                  {category.icon}
                  <span className="category-name">{category.name}</span>
                </Typography>
                <List dense>
                  {category.tools.map((tool) => (
                    <ListItem key={tool.name}>
                      <ListItemIcon>
                        <img src={tool.icon} alt={tool.name} className="tool-icon" />
                      </ListItemIcon>
                      <ListItemText primary={tool.name} />
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