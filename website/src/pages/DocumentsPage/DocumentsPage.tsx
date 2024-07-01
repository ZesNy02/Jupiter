import { Button, Container, Typography, Box, Grid, Paper } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

interface DocumentLinks {
  [key: string]: {
    [key: string]: string;
  };
}
const documentLinks: DocumentLinks = {
  "Jour fixe": {
    v1: "https://drive.google.com/uc?export=download&id=1XKgEdvO0uuBsaEVl8cZWlQLOsqLaRkCk",
    v2: "https://drive.google.com/uc?export=download&id=1TzKl3jxdkg_f7V9sulGMcapQX47Eo5Bi",
    v3: "https://drive.google.com/uc?export=download&id=1Mi6H44qMCWyNhNxpHzdlzuFzupIxpX1U",
    v4: "https://drive.google.com/uc?export=download&id=1L7DUEse9yHhmDXngMbfe195oDQDTElKw",
  },
  Reviews: {
    v1: "https://drive.google.com/uc?export=download&id=1FWmHYYIQdziyd6nmZoUNszubeUSgv42J",
    v2: "https://drive.google.com/uc?export=download&id=1HPCMcrvUEqcj5dLMmckIfbmHOCPH3E3Y",
    v3: "https://drive.google.com/uc?export=download&id=1aSKcA_Gu96ilSRGpFCVNJ0uR8IJieYd0",
    v4: "https://drive.google.com/uc?export=download&id=1BhVDNQb_QvBz3282iiL1iyzKDBl-8C-k",
  },
  Projekthandbuch: {
    v1: "https://drive.google.com/uc?export=download&id=16ijVPnO-f4W_PLWagWI9Xw3jO0_CeFjJ",
    v2: "https://drive.google.com/uc?export=download&id=1JnZ-cQb4v8Gy382M-Ek48JMTzsYCZw6G",
    v3: "https://drive.google.com/uc?export=download&id=1IelGo3mt-rSU-fXPx9_N9IhV_Pv_KvUP",
    v4: "https://drive.google.com/uc?export=download&id=1Y2OFRdgEcm8lFeIK8dB9-a_HcZjgdwva",
  },
  Anforderungsspezifikation: {
    v1: "https://drive.google.com/uc?export=download&id=1PuLFfDMc45NAEPNaSbi-EYKFo1uqpF4g",
    v2: "https://drive.google.com/uc?export=download&id=1eRN7unuL4wKFiK4VMfTADXfEOptZrRdj",
    v3: "https://drive.google.com/uc?export=download&id=1iTki51nK2iRtEMdP203p0y0K5E_niqPr",
    v4: "https://drive.google.com/uc?export=download&id=11ffqGn9H9m6XFj5vQoC3NzB6W9k8-AY4",
  },
  Architekturdokument: {
    v1: "https://drive.google.com/uc?export=download&id=1UD-t85dq88rsONb_h8UXnWMi3nPUJ1_J",
    v2: "https://drive.google.com/uc?export=download&id=1iN1_vQb6wDJnTMKcriOG5WnuERgGSXxE",
    v3: "https://drive.google.com/uc?export=download&id=13ent4YX4ZQgLMDEM5w2v0vFBtM7s4cDP",
  },
  Abschlusspräsentation: {
    v1: "https://drive.google.com/uc?export=download&id=1FbH0vfZouDEjZwH8ZRiDQGXfe7r9GMCe",
  },
};

const DocumentSection = ({
  title,
  versions,
}: {
  title: string;
  versions: string[];
}) => (
  <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Grid container spacing={1}>
      {versions.map((version, index) => (
        <Grid item xs={6} sm={3} key={index}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<DownloadIcon />}
            href={documentLinks[title][version]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {version}
          </Button>
        </Grid>
      ))}
    </Grid>
  </Paper>
);

const DokumentePage = () => {
  const sections = [
    { title: "Jour fixe", versions: ["v1", "v2", "v3", "v4"] },
    { title: "Reviews", versions: ["v1", "v2", "v3", "v4"] },
    { title: "Projekthandbuch", versions: ["v1", "v2", "v3", "v4"] },
    { title: "Anforderungsspezifikation", versions: ["v1", "v2", "v3", "v4"] },
    { title: "Architekturdokument", versions: ["v1", "v2", "v3"] },
    { title: "Abschlusspräsentation", versions: ["v1"] },
  ];

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Dokumente
        </Typography>
        {sections.map((section, index) => (
          <DocumentSection
            key={index}
            title={section.title}
            versions={section.versions}
          />
        ))}
      </Box>
    </Container>
  );
};

export default DokumentePage;
