import { FC } from "react";
import "./ChatHeader.css";
interface ChatHeaderProps {
  onClick: () => void;
  eventStorming?: boolean;

}

const ChatHeader: FC<ChatHeaderProps> = ({
   onClick,
   eventStorming,
  }) => {
  return (
    <>
      <div className={`chat-header${eventStorming ? " active" : ""}`}>
        <h2 className="chat-header-title">Chaty</h2>
        <button onClick={onClick} className="chat-close-button">
          <img src="/ChatCloseIcon.svg" className="chat-close-icon" />
        </button>
      </div>
    </>
  );
};

export default ChatHeader;
