import { FC } from "react";
import "./ChatButton.css";

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <>
      <button onClick={onClick} className="chat-button">
        <img src="/ChatButtonIcon.svg" className="chat-button-icon" />
      </button>
    </>
  );
};

export default ChatButton;
