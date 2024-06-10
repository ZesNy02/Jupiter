import {makeChatButton} from './button.mjs'; // Importiere die JavaScript-Funktion
import './style.css'; // Importiere die CSS-Datei

console.log("main.js"); // Gebe eine Nachricht in der Konsole aus
// Erstelle den Chat-Button und füge ihn zur Seite hinzu
document.body.appendChild(makeChatButton());
window.alert("Test"); // Teste, ob die JavaScript-Datei korrekt geladen wurde