import React from 'react';
import './About.css'
import platzhalter from '../assets/platzhalter.png';
import mustafa from '../assets/profiles/mustafa.png';
import noah from '../assets/profiles/noah.png';
import cedric from '../assets/profiles/cedric.png';
import lenny from '../assets/profiles/lenny.jpg';
import cecile from '../assets/profiles/cecile.jpg';
import paul from '../assets/profiles/paul.png';
import vincent from '../assets/profiles/vincent.png';

const About: React.FC = () => {
  return (
    <div className={"content"}>
      <div className={"white-box"}>
      <div className='Uberschrift-About'>
        <h1>Über uns</h1>
      </div>
      <div className='profiles-box'>
        <div className='profile'>
            <img src={cedric} className='profile-pic' alt="Cedric Herrmann" />
            <p>Cedric Herrmann</p>
            <p>Semester: 5IB</p>
        </div>
          <div className='profile'>
            <img src={noah} className='profile-pic' alt="Noah Schneymann" />
            <p>Noah Schneymann</p>
            <p>Semester: 4IB</p>
          </div>
          <div className='profile'>
            <img src={mustafa} className='profile-pic' alt="Mustafa Dal" />
            <p>Mustafa Dal</p>
            <p>Semester: 5IB</p>
          </div>
          <div className='profile'>
              <img src={cecile} className='profile-pic' alt="Cécile Hilsenbek" style={{'objectPosition': 'top'}}/>
            <p>Cécile Hilsenbek</p>
            <p>Semester: 7D</p>
          </div>
          <div className='profile'>
            <img src={lenny} className='profile-pic' alt="Lenny Zesewitz" />
            <p>Lenny Zesewitz</p>
            <p>Semester: 4IB</p>
          </div>
          <div className='profile'>
            <img src={paul} className='profile-pic' alt="Paul Waßmuth" />
            <p>Paul Waßmuth</p>
            <p>Semester: 4IB</p>
          </div>
          <div className='profile'>
            <img src={vincent} className='profile-pic' alt="Vincent R." />
            <p>Vincent R.</p>
            <p>Semester: 4IB</p>
          </div>
      </div>
    </div>
    </div>
  );
}


export default About;
