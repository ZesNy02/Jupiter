import { FC } from "react";
import "./ChatButton.css";

interface ChatButtonProps {
  onClick: () => void;
  eventStorming: boolean;
}

const ChatButton: FC<ChatButtonProps> = ({ onClick, eventStorming }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`chat-button${eventStorming ? " active" : ""}`}
      >
        <img src="/ChatButtonIcon.svg" className="chat-button-icon" />
      </button>
    </>
  );
};

export default ChatButton;
