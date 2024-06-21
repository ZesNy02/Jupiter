import { FC, useState } from "react";
import "./MainChatWindow.css";
import ChatHeader from "../ChatHeader";
import ChatWrapper from "../ChatWrapper";
import ChatInput from "../ChatInput";
import ESToggleButton from "../ESToggleButton";
import { Prompt } from "../ChatWrapper/ChatWrapper";

interface MainChatWindowProps {
  onClose: () => void;
}

const MainChatWindow: FC<MainChatWindowProps> = ({ onClose }) => {
  const [eventStormingState, setEventStormingState] = useState(false);

  const handleToggleEventStorming = () => {
    setEventStormingState(!eventStormingState);
  };

  const prompts: Prompt[] = [
    {
      message: "What is the Prooph-Board?",
      answers: [
        {
          message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          answer: true,
          error: false,
          eventStorming: false,
          count: 1,
          maxCount: 3,
        },
        {
          message: "Error message",
          answer: true,
          error: true,
          eventStorming: false,
          count: 2,
          maxCount: 3,
        },
        {
          message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          answer: true,
          error: false,
          eventStorming: true,
          count: 3,
          maxCount: 3,
        },
      ],
    },
  ];

  return (
    <div className={`mainChatWindow${eventStormingState ? " active" : ""}`}>
      <ChatHeader onClick={onClose} />
      <ChatWrapper prompts={prompts} />
      <ESToggleButton
        onClick={handleToggleEventStorming}
        eventStorming={eventStormingState}
      />
      <ChatInput />
    </div>
  );
};

export default MainChatWindow;
