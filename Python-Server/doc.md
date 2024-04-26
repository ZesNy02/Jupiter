# Pyhton Server Documentation

- Der Server läuft auf Port 3000
- Wenn eine Nachricht mit HTTP POST empfangen wird, wird gearbeitet
- Es muss aktuell ein JSON String/Object übertragen werden
- Das JSON Object/String muss ein Attribut "message" haben
- SQLite3 Datenbank die Lokal läuft
  - Achtung, die Datei für die Datenbank wird im Ausführverzeichnis angelegt, nicht im Verzeichnis der Python File
- Zurück gesendet wird ein einfacher String
- In der Shell wird der Befehl "llm -m orca-mini-3b-gguf2-q4_0 \<promp\>" ausgeführt
- \<prompt\> kommt aus der "message" vom JSON
- Shell läuft in einem subprozess (parallel)

# Python Client Documentation

- Es wird auf http://localhost:3000/ ein JSON Object gesendet mit dem "message" Attribut
- Es wird auf eine response gewartet
- Response wird auf der Console ausgegeben

# LLM

## Installieren

- Installiere Python
- pip install llm
- llm install llm-gpt4all

## Run LLM

- llm -m orca-mini-3b-gguf2-q4_0
- Der Befehl läuft in der Shell vom System.
