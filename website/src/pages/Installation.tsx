// Installation.tsx
import React from 'react';
import '../Components/Footer/Footer.css';
import './Installation.css'
import platzhalter from '../assets/platzhalter.png';


// CEDRIC MACHT DIESE
const Installation: React.FC = () => {
  return (
    <>  
    <div className={"content"}>
      <div className={"white-box"}>
        <h1 style={{marginLeft: "20%"}}>Installation</h1>
        <p>Client:</p>
        <ul><li>Lade die Tampermonkey Extension für deinen Browser runter</li>
        <li><a href={"https://www.google.com/"}>Klick hier</a> um das Script zu installieren</li></ul>
      </div>
      <div className={"grey-box"}>
        <h2>Server</h2>
        <img className={"installation-images"} src={platzhalter}/>
        <p>Docker</p>
        <ul>
          <li>Ein Beispiel für ein Docker Compose ist <a href={"https://www.google.com/"}>hier</a> zu finden</li>
        </ul>
        <img className={"installation-images"} src={platzhalter}/>
        <p>Benötigt:</p>
        <ul>
          <li>Server mit Ollama und LLaMA3</li>
          <li>Server mit Postgres Datenbank</li>
          <li>Beides über Docker möglich</li>
        </ul>
        <img className={"installation-images"} src={platzhalter}/>
        <p>Nativ:</p>
        <ul>
          <li>Installiere Python 3.10 oder höher</li>
          <li>Installiere Rust von <a href={"https://www.google.com/"}>hier</a></li>
          <li>Klone folgendes <a href={"https://www.google.com/"}>Repository</a></li>
        </ul>
        <img className={"installation-images"} src={platzhalter}/>
        <ul>
          <li>Gehe in den "rust-server" Ordner</li>
          <li>Erstelle eine .env Datei, ein Beipiel ist <a href={"https://www.google.com/"}>hier</a> zu finden</li>
          <li>Führe das start.sh skript aus</li>
        </ul>
      </div>
      <div className={"white-box"}>
        <h2>Tools</h2>
        <div className={"tool-container"}>

          <div className={"tool-box"}>
            <h3 style={{width: "100%"}}>IDE</h3>
            {//Es tut mir leid für diese Hurensöhnigkeit
            }
            <img className={"tool-images solo"} src={platzhalter}/>
            <ul className={"soloText"}>
              <li>Visual Studio Code</li>
            </ul>

          </div>

          <div className={"tool-box"}>
            <h3 style={{width: "100%"}}>Organinsation und Kommunikation</h3>
            <img className={"tool-images"} src={platzhalter}/>
            <ul>
              <li>GitHub</li>
            </ul><img className={"tool-images"} src={platzhalter}/>
            <ul>
              <li>GitHub Projects</li>
            </ul><img className={"tool-images"} src={platzhalter}/>
            <ul>
              <li>Discord</li>
            </ul><img className={"tool-images"} src={platzhalter}/>
            <ul>
              <li>Microsoft Teams</li>
            </ul><img className={"tool-images"} src={platzhalter}/>
            <ul>
              <li>Clockify</li>
            </ul>
          </div>

          <div className={"tool-box"}>
            <h3 style={{width: "100%"}}>Dokumente</h3>
            <img className={"tool-images"} src={platzhalter}/>
            <ul>
              <li>Google Docs</li>
            </ul><img className={"tool-images"} src={platzhalter}/>
            <ul>
              <li>Google Sheets</li>
            </ul><img className={"tool-images"} src={platzhalter}/>
            <ul>
              <li>Google Slides</li>
            </ul>
          </div>

          <div className={"tool-box"}>
            <h3 style={{width: "100%"}}>Sonstiges</h3>
            <img className={"tool-images"} src={platzhalter}/>
            <ul>
              <li>Figma</li>
            </ul><img className={"tool-images"} src={platzhalter}/>
            <ul>
              <li>Docker</li>
            </ul><img className={"tool-images"} src={platzhalter}/>
            <ul>
              <li>Drawio</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Installation;
