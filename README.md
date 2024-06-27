# Dies ist das Projekt von Team Jupiter im Rahmen des SEP's

## Frontend Ordner

Der Frontend Ordner enthält das gesamte Frontend des Chatbot Chaty. Das Frontend liegt sowohl in Form eines Scripts für die Browserextention Tampermonkey unter /Frontend/Tampermonkey/script.js als auch als React App unter /Frontend/React-Komponenten/chaty vor.

### Tampermonkey Script

Um Chaty über die Browserextention auszuführen muss die Extention installiert sein (sie existiert für alle gängigen Browser). Dort erstellt man ein neues Userscript indem man auf "Create a new Script" drückt. Hier wird ein Vorgefertigtes Script Template erstellt. Dieses Template kann gelöscht werden und durch den Inhalt der script.js ersetzt und mit STRG + S unter Windows und Linux gespeichert werden. Wenn man nun ein Bord auf dem Prooph-Board öffnet sollte via Javascript injection der blaue Button in der unteren linken Ecke erscheinen. Sollte dies nicht der Fall sein vergewissere dich, dass die URL des Bordes wie folgt aussieht: https://\*.prooph-board.com/inspectio/board/\* .
Ist dies der Fall reloade die Seite, bis der Button auftaucht. (Dies ist ein bekannter Bug, kann aber nicht durch uns behoben werden)

### React App
Um die React App zu starten navigiere in den Ordner /Frontend/React-Komponenten/chaty. Hier befindet sich die Applikation. Um alle dependencies zu isntallieren öffne das ein Terminal in diesem Ordner und führe den Befehl __**npm install**__ aus. Nachdem du dies getan hast kannst du mit dem Befehl __**npm run dev**__ die App starten. Wenn du nun noch o in das selbe Terminal eingibst und Enter drückst öffnet sich ein Browserfenster in dem sich das Frontend von Chaty befindet. Dir wird auffallen, dass sich hier nur das Frontend ohne das Prooph-Board befindet. Das liegt daran, dass diese React App für eine einfacherer Implementierung in das Prooph-Board entwickelt wurde nach dem Abbild des Tampermonkey Scripts.