import { FC } from "react";
import "./ChatButton.css";

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <>
      <button onClick={onClick} className="chatButton">
        <img src="/ChatButtonIcon.svg" className="chatButtonIcon" />
      </button>
    </>
  );
};

export default ChatButton;
