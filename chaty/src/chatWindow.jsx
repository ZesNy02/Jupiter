import { useState } from 'react';
import PropTypes from 'prop-types';
import './chatWindow.css';


const ChatWindow = ({ isChatOpen, setIsChatOpen }) => {
  const [message, setMessage] = useState('');

  console.log('isChatOpen:', isChatOpen);
  console.log('setIsChatOpen:', setIsChatOpen);
  const toggleWindow = () => {
    setIsChatOpen(false);
  };

  const sendMessage = () => {
    // Handle sending message here
    setMessage('');
  };

  return isChatOpen ? (
    <div className="chat-window">
      <div className="chat-header">
        <h2>Chaty</h2>
        <button onClick={toggleWindow}>Close</button>
      </div>
      <div className="wrapper-prompts-container">
        {/* Chat messages go here */}
      </div>
      <div className="wrapper-chat-input">
        <div className="chat-input-div">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Type your message here"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  ) : null;
};

ChatWindow.propTypes = {
  isChatOpen: PropTypes.bool.isRequired,
  setIsChatOpen: PropTypes.func.isRequired,
};

export default ChatWindow;
