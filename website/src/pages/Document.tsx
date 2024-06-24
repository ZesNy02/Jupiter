import './Document.css'
import {Button} from "@mui/material";

// Cedric macht diese
const Document = () => {
  return (
    <div className={"content"}>
        <div className={"white-box"}>
            <h1 style={{marginLeft: "20%"}}>Dokumente</h1>
            <br/>
            <h2>Jour Fixe</h2>
            <div className={"button-box"}>
                <Button href={"https://moodle.hs-mannheim.de/pluginfile.php/440248/mod_wiki/attachments/1025/JupITer_Jour-Fixe1.pdf"} variant="contained">#1</Button>
                <Button href={"https://moodle.hs-mannheim.de/pluginfile.php/440248/mod_wiki/attachments/1025/JupITer%20Jour%20fixe%20%2302.pdf"} variant="contained">#2</Button>
                <Button href={"https://moodle.hs-mannheim.de/pluginfile.php/440248/mod_wiki/attachments/1025/Jupiter%20Jour%20fixe%203.pdf"} variant="contained">#3</Button>
                <Button href={"https://moodle.hs-mannheim.de/pluginfile.php/440248/mod_wiki/attachments/1025/jupiter-Jourfixe4.pdf"} variant="contained">#4</Button>
            </div>
            <h2>Review</h2>
            <div className={"button-box"}>
                <Button href={"https://moodle.hs-mannheim.de/pluginfile.php/440248/mod_wiki/attachments/1025/Review1-Team-Jupiter.pdf"} variant="contained">#1</Button>
                <Button href={"https://moodle.hs-mannheim.de/pluginfile.php/440248/mod_wiki/attachments/1025/Jupiter-Review-2.pdf"} variant="contained">#2</Button>
                <Button href={"https://moodle.hs-mannheim.de/pluginfile.php/440248/mod_wiki/attachments/1025/Jupiter-Review-3.pdf"} variant="contained">#3</Button>
                <Button href={"https://moodle.hs-mannheim.de/pluginfile.php/440248/mod_wiki/attachments/1025/Jupiter%20Review%20%2304.pdf"} variant="contained">#4</Button>
            </div>
            <h2>Projekthandbuch</h2>
            <div className={"button-box"}>
                <Button href={"https://moodle.hs-mannheim.de/pluginfile.php/440248/mod_wiki/attachments/1025/Projekthandbuch-jupiter.pdf"} variant="contained">v1</Button>
                <Button href={"https://moodle.hs-mannheim.de/pluginfile.php/440248/mod_wiki/attachments/1025/Projekthandbuch-V2-Team-Jupiter.pdf"} variant="contained">v2</Button>
                <Button href={"https://moodle.hs-mannheim.de/pluginfile.php/440248/mod_wiki/attachments/1025/Projekthandbuch-v3-Team-Jupiter.pdf"} variant="contained">v3</Button>
                <Button href={"https://moodle.hs-mannheim.de/pluginfile.php/440248/mod_wiki/attachments/1025/Projekthandbuch-v4-Jupiter.pdf"} variant="contained">v4</Button>
            </div>
            <h2>Architekturdokumentation</h2>
            <div className={"button-box"}>
                <Button href={"https://moodle.hs-mannheim.de/pluginfile.php/440248/mod_wiki/attachments/1025/Jupiter%20Architekturdokument.pdf"} variant="contained">v1</Button>
                <Button href={"https://moodle.hs-mannheim.de/pluginfile.php/440248/mod_wiki/attachments/1025/Jupiter%20Architekturdokument%202.pdf"} variant="contained">v2</Button>
            </div>
            <h2>Anforderungsspezifikation</h2>
            <div className={"button-box"}>
                <Button href={"https://moodle.hs-mannheim.de/pluginfile.php/440248/mod_wiki/attachments/1025/Anforderungsspezifikation-jupiter.pdf"} variant="contained">v1</Button>
                <Button href={"https://moodle.hs-mannheim.de/pluginfile.php/440248/mod_wiki/attachments/1025/jupiter-Anforderungsspezifikationv2.pdf"} variant="contained">v2</Button>
                <Button href={"https://moodle.hs-mannheim.de/pluginfile.php/440248/mod_wiki/attachments/1025/jupiter-anforderungsspezifikation-v3.pdf"} variant="contained">v3</Button>
                <Button href={"https://moodle.hs-mannheim.de/pluginfile.php/440248/mod_wiki/attachments/1025/jupiter-Anforderungsspezifikationv4.pdf"} variant="contained">v4</Button>
            </div>
        </div>
    </div>
  );
}

export default Document;