import React from 'react';


const About: React.FC = () => {
  return (
    <div>
      <h1>Über uns</h1>
      <p>Information about us.</p>
      <table>
        <tr>
          <td>
            <img src="./src/cedric.png" alt="Person 1" />
            <p>Cedric Herrmann</p>
          </td>
          <td>
            <img src="./src/cedric.png" alt="Person 2" />
            <p>Cedric Herrmann</p>
          </td>
          <td>
            <img src="./src/cedric.png" alt="Person 3" />
            <p>Cedric Herrmann</p>
          </td>
        </tr>
        <tr>
          <td>
            <img src="./src/cedric.png" alt="Person 4" />
            <p>Cedric Herrmann</p>
          </td>
          <td>
            <img src="./src/cedric.png" alt="Person 5" />
            <p>Cedric Herrmann</p>
          </td>
          <td>
            <img src="./src/cedric.png" alt="Person 6" />
            <p>Cedric Herrmann</p>
          </td>
        </tr>
      </table>
    </div>
  );
}


export default About;
