import { FC, useState } from "react";
import "./MainChatWindow.css";
import ChatHeader from "../ChatHeader";
import ChatWrapper from "../ChatWrapper";
import ChatInput from "../ChatInput";
import ESToggleButton from "../ESToggleButton";

interface MainChatWindowProps {
  onClose: () => void;
}

const MainChatWindow: FC<MainChatWindowProps> = ({ onClose }) => {
  const [eventStormingState, setEventStormingState] = useState(false);

  const handleToggleEventStorming = () => {
    setEventStormingState(!eventStormingState);
  };

  return (
    <div className={`mainChatWindow${eventStormingState ? " active" : ""}`}>
      <ChatHeader onClick={onClose} />
      <ChatWrapper />
      <ESToggleButton
        onClick={handleToggleEventStorming}
        eventStorming={eventStormingState}
      />
      <ChatInput />
    </div>
  );
};

export default MainChatWindow;
