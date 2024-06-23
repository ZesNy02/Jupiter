import React from 'react';
import './About.css'
import platzhalter from '../assets/platzhalter.png';

const About: React.FC = () => {
  return (
    <div className={"content"}>
      <div className='Uberschrift-About'>
        <h1>Über uns</h1>
      </div>
      <table>
        <tr>
          <td>
            <img src={platzhalter} className='profile' alt="Cedric Herrmann" />
            <p>Cedric Herrmann</p>
            <p>Semester: 5IB</p>
          </td>
          <td>
            <img src={platzhalter} className='profile' alt="Noah Schneymann" />
            <p>Noah Schneymann</p>
            <p>Semester: 4IB</p>
          </td>
          <td>
            <img src={platzhalter} className='profile' alt="Mustafa Dal" />
            <p>Mustafa Dal</p>
            <p>Semester: 5IB</p>
          </td>
        </tr>
        <tr>
          <td>
            <img src={platzhalter} className='profile' alt="Cécile Hilsenbek" />
            <p>Cécile Hilsenbek</p>
            <p>Semester: 7D</p>
          </td>
          <td>
            <img src={platzhalter} className='profile' alt="Lenny Zesewitz" />
            <p>Lenny Zesewitz</p>
            <p>Semester: 4IB</p>
          </td>
          <td>
            <img src={platzhalter} className='profile' alt="Paul Waßmuth" />
            <p>Paul Waßmuth</p>
            <p>Semester: 4IB</p>
          </td>
        </tr>
        <tr>
          <td>
            <img src={platzhalter} className='profile' alt="Vincent R." />
            <p>Vincent R.</p>
            <p>Semester: 4IB</p>
          </td>
        </tr>
      </table>
    </div>
  );
}


export default About;
