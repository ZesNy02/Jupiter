import React from 'react';
import '../Components/Footer/Footer.css';
import './Installation.css'
import platzhalter from '../assets/platzhalter.png';

import monkey1 from '../assets/installation/monkey1.png';
import monkey2 from '../assets/installation/monkey2.png';
import monkey3 from '../assets/installation/monkey3.png';
import monkey4 from '../assets/installation/monkey4.png';

import clockify from '../assets/icon-pics/clockify.png';
import discord from '../assets/icon-pics/discord.png';
import docker from '../assets/icon-pics/docker.png';
import figma from '../assets/icon-pics/figma.png';
import github from '../assets/icon-pics/github.png';
import googleDocs from '../assets/icon-pics/googledocs.png';
import googleSheets from '../assets/icon-pics/sheets.png';
import googleSlides from '../assets/icon-pics/slides.png';
import microsoftTeams from '../assets/icon-pics/teams.png';
import visualStudioCode from '../assets/icon-pics/vscode.png';


const Installation: React.FC = () => {
  return (
    <>  
    <div className={"content"}>

      <div className={"installationsbox"}>

        <div className={"white-box"}>
          <h1>Installation von Chaty für die Prooph-Board App</h1>
          <p>Willkommen zur Installationsanleitung für Chaty, 
            deinem neuen Chatbot für die Prooph-Board App.
            Bitte folge den unten stehenden Schritten, 
            um Chaty erfolgreich zu installieren und in Betrieb zu nehmen.
          Client-Installation
          </p>
          <h3>Tampermonkey Extension installieren und einrichten</h3>
          <ul>
            <li>Lade die Tampermonkey Extension für deinen Browser herunter und installiere sie.</li>
          </ul>
          <img className={"installation-images"} src={monkey1} alt='tool-image'/>
          <ul>
            <li>Öffne das Tampermonkey Dashboard in deinem Browser.</li>
          </ul>
          <img className={"installation-images"} src={monkey2} alt='tool-image'/>
          <ul>
            <li>Neues Userscript erstellen</li>
          </ul>
          <img className={"installation-images"} src={monkey3} alt='tool-image'/>
          <ul>
            <li>Kopiere das Script von <a href={"https://drive.google.com/drive/folders/12Jz4mWS9Vl1yOrUG-nNRAwqlPH9hTTLu"}>hier</a> und füge es in das neue Userscript ein.</li>
            <li> Im Script findest du ganz oben eine Konstante namens BASE_SERVER_URL. </li>
            <li> Ersetze diesen Wert durch die URL deines Servers:</li>
            <li> const BASE_SERVER_URL = 'https://dein-server-url.com'; </li>
          </ul>
          <img className={"installation-images"} src={monkey4} alt='tool-image'/>
        </div>

        <div className={"grey-box"}>

          <h3>Server installation</h3>

          <p>Benötigte Voraussetzungen (können auch über Docker erfüllt werden):</p>
          <ul>
            <li>Stelle sicher, dass dein Server Ollama und LLaMA3 unterstützt.</li>
          </ul>
          <img className={"installation-images"} src={platzhalter} alt='tool-image'/>
          <ul>
            <li>Ein Server mit einer installierten Postgres-Datenbank ist erforderlich.</li>
          </ul>
          <img className={"installation-images"} src={platzhalter} alt='tool-image'/>

          <p>Installation mit Docker:</p>
          <ul>
            <li>Ein Beispiel für die Einrichtung mit Docker Compose findest du hier.</li>
          </ul>
          <img className={"installation-images"} src={platzhalter} alt='tool-image'/>
          <h4>Native Installation</h4>

          <p>Python und Rust installieren:</p>
          <ul>
            <li>Installiere Python 3.10 oder höher von hier.</li>
          </ul>
          <img className={"installation-images"} src={platzhalter} alt='tool-image'/>
          <ul>
            <li>Installiere Rust von hier.</li>
          </ul>
          <img className={"installation-images"} src={platzhalter} alt='tool-image'/>
          
          <p>Repository klonen:</p>
          <ul>
            <li>Klone das Chaty Repository auf deinen Server.</li>
          </ul>
          <img className={"installation-images"} src={platzhalter} alt='tool-image'/>

          <p>In den rust-server Ordner wechseln:</p>
          <ul>
            <li>Wechsle in den “rust-server” Ordner innerhalb des geklonten Repositories.</li>
          </ul>
          <img className={"installation-images"} src={platzhalter} alt='tool-image'/>

          <p>Dependencies installieren:</p>
          <ul>
            <li>Führe das passende Setup-Script aus, um die Abhängigkeiten zu installieren:</li>
            <li>Für Linux: linux_setup.sh</li>
            <li>Für Windows: windows_setup.bat</li>
          </ul>
          <img className={"installation-images"} src={platzhalter} alt='tool-image'/>
        
          <p>rust-server/.env Datei erstellen:</p>
          <ul>
            <li>Erstelle eine rust-server/.env Datei mit den notwendigen Konfigurationsparametern. Ein Beispiel findest du hier.</li>
          </ul>
          <img className={"installation-images"} src={platzhalter} alt='tool-image'/>

          <p>Server starten mit den folgenden Befehlen:</p>
          <ul>
            <li>bash</li>
            <li>cargo run</li>
          </ul>
          <img className={"installation-images"} src={platzhalter} alt='tool-image'/>
        </div>

        <div className={"white-box"}>
          <h2>Tools</h2>
          <div className={"tool-container"}>

            <div className={"tool-box"}>
              <h3 style={{width: "100%"}}>IDE</h3>
              <img className={"tool-images solo"} src={visualStudioCode} alt='tool-image'/>
              <ul className={"soloText"}>
                <li>Visual Studio Code</li>
              </ul>

            </div>

            <div className={"tool-box"}>
              <h3 style={{width: "100%"}}>Organinsation und Kommunikation</h3>
              <img className={"tool-images"} src={github} alt='tool-image'/>
              <ul>
                <li>GitHub</li>
              </ul><img className={"tool-images"} src={discord} alt='tool-image'/>
              <ul>
                <li>Discord</li>
              </ul><img className={"tool-images"} src={microsoftTeams} alt='tool-image'/>
              <ul>
                <li>Microsoft Teams</li>
              </ul><img className={"tool-images"} src={clockify} alt='tool-image'/>
              <ul>
                <li>Clockify</li>
              </ul>
            </div>

            <div className={"tool-box"}>
              <h3 style={{width: "100%"}}>Dokumente</h3>
              <img className={"tool-images"} src={googleDocs} alt='tool-image'/>
              <ul>
                <li>Google Docs</li>
              </ul><img className={"tool-images"} src={googleSheets} alt='tool-image'/>
              <ul>
                <li>Google Sheets</li>
              </ul><img className={"tool-images"} src={googleSlides} alt='tool-image'/>
              <ul>
                <li>Google Slides</li>
              </ul>
            </div>

            <div className={"tool-box"}>
              <h3 style={{width: "100%"}}>Sonstiges</h3>
              <img className={"tool-images"} src={figma} alt='tool-image'/>
              <ul>
                <li>Figma</li>
              </ul><img className={"tool-images"} src={docker} alt='tool-image'/>
              <ul>
                <li>Docker</li>
              </ul>
            </div>
        </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Installation;
