import React from 'react';
import './About.css'
import platzhalter from '../assets/platzhalter.png';

const About: React.FC = () => {
  return (
    <div className={"content"}>
      <div className={"white-box"}>
      <div className='Uberschrift-About'>
        <h1>Über uns</h1>
      </div>
      <div className='profiles-box'>
        <div className='profile'>
            <img src={platzhalter} className='profile-pic' alt="Cedric Herrmann" />
            <p>Cedric Herrmann</p>
            <p>Semester: 5IB</p>
        </div>
          <div className='profile'>
            <img src={platzhalter} className='profile-pic' alt="Noah Schneymann" />
            <p>Noah Schneymann</p>
            <p>Semester: 4IB</p>
          </div>
          <div className='profile'>
            <img src={platzhalter} className='profile-pic' alt="Mustafa Dal" />
            <p>Mustafa Dal</p>
            <p>Semester: 5IB</p>
          </div>
          <div className='profile'>
            <img src={platzhalter} className='profile-pic' alt="Cécile Hilsenbek" />
            <p>Cécile Hilsenbek</p>
            <p>Semester: 7D</p>
          </div>
          <div className='profile'>
            <img src={platzhalter} className='profile-pic' alt="Lenny Zesewitz" />
            <p>Lenny Zesewitz</p>
            <p>Semester: 4IB</p>
          </div>
          <div className='profile'>
            <img src={platzhalter} className='profile-pic' alt="Paul Waßmuth" />
            <p>Paul Waßmuth</p>
            <p>Semester: 4IB</p>
          </div>
          <div className='profile'>
            <img src={platzhalter} className='profile-pic' alt="Vincent R." />
            <p>Vincent R.</p>
            <p>Semester: 4IB</p>
          </div>
      </div>
    </div>
    </div>
  );
}


export default About;
