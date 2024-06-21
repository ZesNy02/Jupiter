import { FC } from "react";
import "./MainChatWindow.css";
import ChatHeader from "../ChatHeader";
import ChatWrapper from "../ChatWrapper";
import ChatInput from "../ChatInput";
import ESToggleButton from "../ESToggleButton";

interface MainChatWindowProps {
  onClose: () => void;
}

const MainChatWindow: FC<MainChatWindowProps> = ({ onClose }) => {
  return (
    <div className="mainChatWindow">
      <ChatHeader onClick={onClose} />
      <ChatWrapper />
      <ESToggleButton onClick={() => {}} />
      <ChatInput />
    </div>
  );
};

export default MainChatWindow;
