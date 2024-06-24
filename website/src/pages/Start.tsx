import React from 'react';
import platzhalter from '../assets/platzhalter.png';
import './Start.css'

const Start: React.FC = () => {    
  
  return (
    <div className="content">
      <div className="produkt-vorstellung">
        <h1>Willkommen </h1>
        <h1>bei Chaty!</h1>
        <div className={"intro-box"}>
            <img className={"tool-images"} src={platzhalter} alt="blabla"/>
              <div className="absatz-style1">
                <h3>Was ist das Prooph Board?</h3>
                <p>
                Mit dem von Prooph Software GmbH entwickelten Prooph Board kann Jedermann Event-Streams und Prozesse, 
                die zentrale Bestandteile von Event-getriebenen Anwendungen sind, effizient und remote im Team planen.
                </p>
              </div>
        </div>

        <div className={"intro-box"}>   
            <div className="absatz-style1">
            <h3>Chaty – der Chatbot für das Prooph Board! </h3>
              <p>Wir freuen uns, Ihnen unseren neuesten Chatbot vorstellen zu dürfen
              – Chaty – ein Werkzeug, das die Nutzung des Prooph Boards vereinfachen wird. 
              Unser Chatbot ist darauf ausgelegt, Ihnen bei Verständnisfragen zu helfen, 
              die Funktionen des Prooph Boards zu erklären und Sie beim Event Storming zu unterstützen!</p>
              </div>
            <img className={"tool-images"} src={platzhalter} alt="blabla"/>
          </div>

        
<img className={"tool-images"} src={platzhalter} alt="blabla"/>
           <p>Stelle Chaty Fragen und lass dir helfen!"</p>
           <img className={"tool-images"} src={platzhalter} alt="blabla"/>
           <p>Lassen Sie sich Event Stickys erstellen!"</p>
      </div>   
      <div className="team-vorstellung">
        
        <h3>Warum dieses Projekt?</h3>
        <p>Im Sommersemester 2024 erhielt das Team Jupiter der Hochschule Mannheim
           den Auftrag von bitExpert, eine künstliche Intelligenz in das Prooph-Board 
           zu integrieren. Sie entwickelten dafür den Chatbot "Chaty", 
           der Nutzern bei Fragen und Problemen rund um Event Sourcing unterstützt. 
           Chaty verbessert die Benutzerfreundlichkeit des Prooph-Boards erheblich,
            indem er schnelle und effiziente Hilfe bietet. 
        </p>
      <img className="team-bild" src={platzhalter} alt="team-bild" />
      </div>
    </div>
  );
}

export default Start;