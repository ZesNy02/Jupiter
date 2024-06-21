import React from 'react';
import platzhalter from '../assets/platzhalter.png';
import About from "./About.tsx"

const Start: React.FC = () => {
  
  return (
    <div className="content">
      <div className="produkt-vorstellung">
        <h2>Willkommen bei ihrem neunen Helfer für das Prooph Board!</h2>

        <h3>Was ist das Prooph Board?</h3>
        <p>
          Mit dem von Prooph Software GmbH entwickelten Prooph Board kann Jedermann Event-Streams und Prozesse, 
          die zentrale Bestandteile von Event-getriebenen Anwendungen sind, effizient und remote im Team planen.
          </p>

        <h3>Chaty – der Chatbot für das Prooph Board! </h3>
        <p>Wir freuen uns, Ihnen unseren neuesten Chatbot vorstellen zu dürfen
           – Chaty – ein Werkzeug, das die Nutzung des Prooph Boards vereinfachen wird. 
           Unser Chatbot ist darauf ausgelegt, Ihnen bei Verständnisfragen zu helfen, 
           die Funktionen des Prooph Boards zu erklären und Sie beim Event Storming zu unterstützen!</p>

           <p>Stelle Chaty Fragen und lass dir helfen!"</p>

           <p>Lassen Sie sich Event Stickys erstellen!"</p>
      </div>   
      <div className="team-vorstellung">
        
        <h3>Warum dieses Projekt?</h3>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
           sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. 
            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
             amet. </p>
      <img className="team-bild" src={platzhalter} alt="team-bild" />
      <p>Lerne uns kennen</p>
      </div>
    </div>
  );
}

export default Start;