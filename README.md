# Dies ist das Projekt von Team Jupiter im Rahmen des SEP's

## Frontend

Der Frontend Ordner enthält das gesamte Frontend des Chatbot Chaty. Das Frontend liegt sowohl in Form eines Scripts für die Browserextention Tampermonkey unter /Frontend/Tampermonkey/script.js als auch als React App unter /Frontend/React-Komponenten/chaty vor.

### Tampermonkey Script

Um Chaty über die Browserextention auszuführen muss die Extention installiert sein (sie existiert für alle gängigen Browser). Dort erstellt man ein neues Userscript indem man auf "Create a new Script" drückt. Hier wird ein Vorgefertigtes Script Template erstellt. Dieses Template kann gelöscht werden und durch den Inhalt der script.js ersetzt und mit STRG + S unter Windows und Linux gespeichert werden. Wenn man nun ein Bord auf dem Prooph-Board öffnet sollte via Javascript injection der blaue Button in der unteren linken Ecke erscheinen. Sollte dies nicht der Fall sein vergewissere dich, dass die URL des Bordes wie folgt aussieht: https://\*.prooph-board.com/inspectio/board/\* .
Ist dies der Fall reloade die Seite, bis der Button auftaucht. (Dies ist ein bekannter Bug, kann aber nicht durch uns behoben werden)

Aktuell läuft das Script über einen Server, auf dem Das Backend via einem Docker Image läuft. Um das Frontend mit dem Lokalen Backend zum laufen zu bringen muss die BASE_SERVER_URL im Zeile 18 des Scripts auf **http://localhost** geändert werden und die URLs müssen um den Port **3000** erweitert werden.

### React App

Um die React App zu starten navigiere in den Ordner /Frontend/React-Komponenten/chaty. Hier befindet sich die Applikation. Um alle dependencies zu isntallieren öffne das ein Terminal in diesem Ordner und führe den Befehl \***\*npm install\*\*** aus. Nachdem du dies getan hast kannst du mit dem Befehl \***\*npm run dev\*\*** die App starten. Wenn du nun noch o in das selbe Terminal eingibst und Enter drückst öffnet sich ein Browserfenster in dem sich das Frontend von Chaty befindet. Dir wird auffallen, dass sich hier nur das Frontend ohne das Prooph-Board befindet. Das liegt daran, dass diese React App für eine einfacherer Implementierung in das Prooph-Board entwickelt wurde nach dem Abbild des Tampermonkey Scripts.

# Backend

## Vorbereitung

### Python

- Installiere **Python** (mindestens Version 3.10.12) und **pip** von der offiziellen Seite.

### Rust

- Installiere **rustup** von `rust-lang.org` and folge deren Anweisungen dort.
- Der Befehl **cargo** muss problemlos funktionieren.

## Den Server einrichten

### Docker

- Eine Beispiel Docker Compose Datei ist im `rust-server` Verzeichnis zu finden mit dem Namen **example_compose.yml**.

### Native

#### Packete Installieren

- Um die benötigten Packete zu installieren führe entweder das **linux_setup.sh** oder das **windows_setup.bat** Skript aus dem `rust-server` Verzeichnis aus, je nachdem welches Betriebssystem Sie verwenden.

#### Environment Variablen hinzufügen

- Erstelle eine **.env** Datei unter `rust-server/.env`.
- Füge mindestens die **benötigten** Variablen hinzu:
  - **`DB_HOST`**: Die Adresse des Datenbank Servers. Beispiel: **127.0.0.1**
  - **`DB_NAME`**: Der Name der Datenbank. Beispiel: **postgres**
  - **`DB_USER`**: Der Benutzername der Datenbank. Beispiel: **postgres**
  - **`DB_PASSWORD`**: Das Password der Datenbank. Beispiel: **password**
  - **`LLM_SERVER`**: Die Adresse des LLM Servers auf dem Ollama läuft mit LLaMA3 und mxbai-embed-large. Zum Beispiel: `http://localhost:3000`, nicht mehr.
  - **`LLM_TOKEN`**: Der Authentifizierungstoken des LLM Servers (Ollama).
  - **`CLIENT_SECRET`**: Das Client Secret von der Prooph-Board API.
  - **`CLIENT_ID`**: Die Client ID von der Prooph-Board API.
    Sieht wiefolgt aus: `_board_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.
  - `IP`: Die IP Adresse, auf der der Server laufen soll. Standardwert: `0.0.0.0`.
  - `PORT`: Der Port, auf den der Server laufen soll. Standardwert: `3000`.
  - `DB_PORT`: Der Port des Datenbankservers. Standardwert: `5432`.

#### Run the Server

- Um den Server zu starten gehe in das `rust-server` Verzeichnis.
- Führe `cargo run` in der Konsole aus.

### See the Rust Documentation

- Um die Dokumentation des Rust Servers zu sehen, gehe in das `rust-server/target/doc/rust_server` Verzeichnis und öffne die `index.html` Datei.
