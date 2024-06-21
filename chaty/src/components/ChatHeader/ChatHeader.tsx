import { FC } from "react";
import "./ChatHeader.css";

interface ChatHeaderProps {
  onClick: () => void;
}

const ChatHeader: FC<ChatHeaderProps> = ({ onClick }) => {
  return (
    <>
      <div className="chatHeader">
        <h2 className="chatHeaderTitle">Chaty</h2>
        <button onClick={onClick} className="chatCloseButton">
          <img src="/ChatCloseIcon.svg" className="chatCloseIcon" />
        </button>
      </div>
    </>
  );
};

export default ChatHeader;
