import { FC } from "react";
import "./ChatMessageButton.css";

interface ChatMessageButtonProps {
  onClick: () => void;
  iconPath: string;
  active: boolean;
  activeColor: string;
}

const ChatMessageButton: FC<ChatMessageButtonProps> = ({
  onClick,
  iconPath,
  active,
  activeColor,
}) => {
  const activeStyle = active
    ? {
        fill: activeColor,
      }
    : {};

  return (
    <>
      <button className="chat-message-action-button" onClick={onClick}>
        <img
          src={iconPath}
          className={`chat-message-action-icon`}
          style={activeStyle}
        />
      </button>
    </>
  );
};

export default ChatMessageButton;
