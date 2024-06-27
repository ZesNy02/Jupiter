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
        filter: `brightness(0) saturate(100%) invert(${activeColor}) sepia(100%) saturate(746%) hue-rotate(195deg) brightness(91%) contrast(95%)`,
      }
    : {};

  return (
    <>
      <button className="chat-message-action-button" onClick={onClick}>
        <img
          src={iconPath}
          className={`chat-message-action-icon ${active ? 'active' : ''}`}
          style={activeStyle}
        />
      </button>
    </>
  );
};

export default ChatMessageButton;
