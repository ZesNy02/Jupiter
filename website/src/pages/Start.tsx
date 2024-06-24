import React from 'react';
import platzhalter from '../assets/platzhalter.png';
import macbild from '../assets/MacBookProMockupLeft.png';
import chatbild from '../assets/ai-bot-chat.png';
import gruppenbild from '../assets/istockphoto.jpg';
import './Start.css'

const Start: React.FC = () => {    
  
  return (
    <div className="content">
      <div className="black-box">
        <h1>Willkommen bei Chaty!</h1>
        <div className={"intro-box"}>
            <img className={"intro-images"} src={macbild} alt="intro-images"/>
              <div>
                <h3>Was ist das Prooph Board?</h3>
                <p>
                Mit dem von Prooph Software GmbH entwickelten Prooph Board kann Jedermann Event-Streams und Prozesse, 
                die zentrale Bestandteile von Event-getriebenen Anwendungen sind, effizient und remote im Team planen.
                </p>
              </div>
        </div>

        <div className={"intro-box"}>   
            <div>
            <h3>Chaty – der Chatbot für das Prooph Board! </h3>
              <p>Wir freuen uns, Ihnen unseren neuesten Chatbot vorstellen zu dürfen
              – Chaty – ein Werkzeug, das die Nutzung des Prooph Boards vereinfachen wird. 
              Unser Chatbot ist darauf ausgelegt, Ihnen bei Verständnisfragen zu helfen, 
              die Funktionen des Prooph Boards zu erklären und Sie beim Event Storming zu unterstützen!</p>
              </div>
            <img className={"intro-images"} src={chatbild} alt="intro-images"/>
          </div>
      </div>  

      <div className="white-box">
        <h3>Warum dieses Projekt?</h3>
          <div className='team-box'>
        <p>Im Sommersemester 2024 erhielt das Team Jupiter der Hochschule Mannheim
           den Auftrag von bitExpert, eine künstliche Intelligenz in das Prooph-Board 
           zu integrieren. Sie entwickelten dafür den Chatbot "Chaty", 
           der Nutzern bei Fragen und Problemen rund um Event Sourcing unterstützt. 
           Chaty verbessert die Benutzerfreundlichkeit des Prooph-Boards erheblich,
            indem er schnelle und effiziente Hilfe bietet. 
        </p>
      <img className="team-images" src={gruppenbild} alt="team-images" />
      </div>
      </div>
    </div>
  );
}

export default Start;