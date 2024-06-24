import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
      <div className="footer"> 
        
        <div className='anschrift'>
          <h2>Anschrift</h2>
          <p>Hochschule Mannheim</p>
          <p>Paul-Wittsack Straße 10</p>
          <p>68163 Mannheim</p>
        </div>
        <div className='kontakt'>
            <h2>Kontakt</h2>
            <p>E-Mail: mail@mail.de</p>
        </div>
        </div>
      
  );
};

export default Footer;