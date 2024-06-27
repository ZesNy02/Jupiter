import { FC } from "react";
import "./DocumentsPage.css";
import { Button } from "@mui/material";

interface DocumentsPageProps {}

const DocumentsPage: FC<DocumentsPageProps> = ({}) => {
  return (
    <>
      <div className={"content"}>
        <div className={"white-box"}>
          <h1>Dokumente</h1>
          <h2>Jour Fixe</h2>
          <div className={"button-box"}>
            <Button
              href={
                "https://drive.google.com/uc?export=download&id=1XKgEdvO0uuBsaEVl8cZWlQLOsqLaRkCk"
              }
              variant="contained"
            >
              #1
            </Button>
            <Button
              href={
                "https://drive.google.com/uc?export=download&id=1TzKl3jxdkg_f7V9sulGMcapQX47Eo5Bi"
              }
              variant="contained"
            >
              #2
            </Button>
            <Button
              href={
                "https://drive.google.com/uc?export=download&id=1Mi6H44qMCWyNhNxpHzdlzuFzupIxpX1U"
              }
              variant="contained"
            >
              #3
            </Button>
            <Button
              href={
                "https://drive.google.com/uc?export=download&id=1L7DUEse9yHhmDXngMbfe195oDQDTElKw"
              }
              variant="contained"
            >
              #4
            </Button>
          </div>
          <h2>Review</h2>
          <div className={"button-box"}>
            <Button
              href={
                "https://drive.google.com/uc?export=download&id=1FWmHYYIQdziyd6nmZoUNszubeUSgv42J"
              }
              variant="contained"
            >
              #1
            </Button>
            <Button
              href={
                "https://drive.google.com/uc?export=download&id=1HPCMcrvUEqcj5dLMmckIfbmHOCPH3E3Y"
              }
              variant="contained"
            >
              #2
            </Button>
            <Button
              href={
                "https://drive.google.com/uc?export=download&id=1aSKcA_Gu96ilSRGpFCVNJ0uR8IJieYd0"
              }
              variant="contained"
            >
              #3
            </Button>
            <Button
              href={
                "https://drive.google.com/uc?export=download&id=1BhVDNQb_QvBz3282iiL1iyzKDBl-8C-k"
              }
              variant="contained"
            >
              #4
            </Button>
          </div>
          <h2>Projekthandbuch</h2>
          <div className={"button-box"}>
            <Button
              href={
                "https://drive.google.com/uc?export=download&id=16ijVPnO-f4W_PLWagWI9Xw3jO0_CeFjJ"
              }
              variant="contained"
            >
              v1
            </Button>
            <Button
              href={
                "https://drive.google.com/uc?export=download&id=1JnZ-cQb4v8Gy382M-Ek48JMTzsYCZw6G"
              }
              variant="contained"
            >
              v2
            </Button>
            <Button
              href={
                "https://drive.google.com/uc?export=download&id=1IelGo3mt-rSU-fXPx9_N9IhV_Pv_KvUP"
              }
              variant="contained"
            >
              v3
            </Button>
            <Button
              href={
                "https://drive.google.com/uc?export=download&id=1Y2OFRdgEcm8lFeIK8dB9-a_HcZjgdwva"
              }
              variant="contained"
            >
              v4
            </Button>
          </div>
          <h2>Architekturdokumentation</h2>
          <div className={"button-box"}>
            <Button
              href={
                "https://drive.google.com/uc?export=download&id=1UD-t85dq88rsONb_h8UXnWMi3nPUJ1_J"
              }
              variant="contained"
            >
              v1
            </Button>
            <Button
              href={
                "https://drive.google.com/uc?export=download&id=1iN1_vQb6wDJnTMKcriOG5WnuERgGSXxE"
              }
              variant="contained"
            >
              v2
            </Button>
          </div>
          <h2>Anforderungsspezifikation</h2>
          <div className={"button-box"}>
            <Button
              href={
                "https://drive.google.com/uc?export=download&id=1PuLFfDMc45NAEPNaSbi-EYKFo1uqpF4g"
              }
              variant="contained"
            >
              v1
            </Button>
            <Button
              href={
                "https://drive.google.com/uc?export=download&id=1eRN7unuL4wKFiK4VMfTADXfEOptZrRdj"
              }
              variant="contained"
            >
              v2
            </Button>
            <Button
              href={
                "https://drive.google.com/uc?export=download&id=1iTki51nK2iRtEMdP203p0y0K5E_niqPr"
              }
              variant="contained"
            >
              v3
            </Button>
            <Button
              href={
                "https://drive.google.com/uc?export=download&id=11ffqGn9H9m6XFj5vQoC3NzB6W9k8-AY4"
              }
              variant="contained"
            >
              v4
            </Button>
          </div>
          <h2>Abschlusspräsentation</h2>
          <div className={"button-box"}>
            <Button
              href={
                "https://drive.google.com/uc?export=download&id=1UD-t85dq88rsONb_h8UXnWMi3nPUJ1_J"
              }
              variant="contained"
            >
              v1
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentsPage;
