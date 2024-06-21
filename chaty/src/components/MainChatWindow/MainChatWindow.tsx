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

const example: Prompt[] = [
  {
    message: "What is the Prooph-Board?",
    id: 1,
    answers: [
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        answer: true,
        error: false,
        eventStorming: false,
        count: 1,
        maxCount: 4,
        loading: false,
      },
      {
        message: "Error message",
        answer: true,
        error: true,
        eventStorming: false,
        count: 2,
        maxCount: 4,
        loading: false,
      },
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        answer: true,
        error: false,
        eventStorming: true,
        count: 3,
        maxCount: 4,
        loading: false,
      },
      {
        message: "",
        answer: true,
        error: false,
        eventStorming: false,
        count: 4,
        maxCount: 4,
        loading: true,
      },
    ],
  },
];

const MainChatWindow: FC<MainChatWindowProps> = ({ onClose }) => {
  const [eventStormingState, setEventStormingState] = useState(false);
  const [prompts, setPrompts] = useState<Prompt[]>(example);

  const handleToggleEventStorming = () => {
    setEventStormingState(!eventStormingState);
  };

  const handlePromptRequest = (prompt: string) => {
    // TODO: implement
    setPrompts((prev) => {
      return [
        ...prev,
        {
          message: prompt,
          id: prev.length + 1,
          answers: [],
        },
      ];
    });
  };

  return (
    <div className={`mainChatWindow${eventStormingState ? " active" : ""}`}>
      <button className="chatWindowResizeButton">
        <img src="/ResizeIcon.svg" className="chatWindowResizeIcon" />
      </button>
      <ChatHeader onClick={onClose} />
      <ChatWrapper prompts={prompts} />
      <ESToggleButton
        onClick={handleToggleEventStorming}
        eventStorming={eventStormingState}
      />
      <ChatInput onSend={handlePromptRequest} />
    </div>
  );
};

export default MainChatWindow;
