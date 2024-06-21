import './Document.css'
import {Button} from "@mui/material";

// Cedric macht diese
const Document = () => {
  return (
    <div className={"content"}>
        <div className={"white-box"}>
            <h1>Dokumente</h1>
            <br/>
            <h2>Jour Fixe</h2>
            <div className={"button-box"}>
                <Button variant="contained">#1</Button>
                <Button variant="contained">#2</Button>
                <Button variant="contained">#3</Button>
                <Button variant="contained">#4</Button>
            </div>
            <h2>Review</h2>
            <div className={"button-box"}>
                <Button variant="contained">#1</Button>
                <Button variant="contained">#2</Button>
                <Button variant="contained">#3</Button>
                <Button variant="contained">#4</Button>
            </div>
            <h2>Projekthandbuch</h2>
            <div className={"button-box"}>
                <Button variant="contained">v1</Button>
                <Button variant="contained">v2</Button>
                <Button variant="contained">v3</Button>
                <Button variant="contained">v4</Button>
            </div>
            <h2>Architekturdokumentation</h2>
            <div className={"button-box"}>
                <Button variant="contained">v1</Button>
                <Button variant="contained">v2</Button>
                <Button variant="contained">v3</Button>
            </div>
            <h2>Anforderungsspezifikation</h2>
            <div className={"button-box"}>
                <Button variant="contained">v1</Button>
                <Button variant="contained">v2</Button>
                <Button variant="contained">v3</Button>
                <Button variant="contained">v4</Button>
            </div>
        </div>
    </div>
  );
}

export default Document;