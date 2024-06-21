import React from 'react';
import './chatButton.css';

// Typdefinition für die Props
interface ChatButtonProps {
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatButton: React.FC<ChatButtonProps> = ({ setIsChatOpen }) => {
  const toggleChat = () => {
    setIsChatOpen(true);
  };

  return (
    <button className="chatButton" onClick={toggleChat}>
      <svg xmlns="http://www.w3.org/2000/svg" height="90%" viewBox="0 -960 960 960" width="90%" fill="#D9D9D9">
        <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
      </svg>
    </button>
  );
};

export default ChatButton;