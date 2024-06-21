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
        color: activeColor,
      }
    : {};

  return (
    <>
      <button className="chatMessageActionButton" onClick={onClick}>
        <img
          src={iconPath}
          className={`chatMessageActionIcon`}
          style={activeStyle}
        />
      </button>
    </>
  );
};

export default ChatMessageButton;
