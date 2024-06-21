import { FC } from "react";
import "./ChatButton.css";

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <>
      <button onClick={onClick} className="">
        {
          // SVG here
        }
      </button>
    </>
  );
};

export default ChatButton;
