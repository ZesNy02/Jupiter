import { FC, useState } from "react";
import "./MainChatWindow.css";
import ChatHeader from "../ChatHeader";
import ChatWrapper from "../ChatWrapper";
import ChatInput from "../ChatInput";
import ESToggleButton from "../ESToggleButton";
import { Answer, Prompt } from "../ChatMessage/ChatMessage";

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
        count: 1,
        maxCount: 4,
      },
      {
        message: "Error message",
        answer: true,
        error: true,
        count: 2,
        maxCount: 4,
      },
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        answer: true,
        eventStorming: true,
        count: 3,
        maxCount: 4,
      },
      {
        message: "",
        answer: true,
        count: 4,
        maxCount: 4,
        loading: true,
      },
    ],
  },
];

type ServerResponse = { Success: "ok" } | { Error: string };

const MainChatWindow: FC<MainChatWindowProps> = ({ onClose }) => {
  const [eventStormingState, setEventStormingState] = useState(false);
  const [prompts, setPrompts] = useState<Prompt[]>(example);

  const addPrompt = (prompt: string, promptId: number) => {
    setPrompts((prev) => {
      return [
        ...prev,
        {
          message: prompt,
          id: promptId,
          answers: [],
        },
      ];
    });
  };

  const addAnswer = (promptId: number, answer: Answer) => {
    setPrompts((prev) => {
      return prev.map((prompt) => {
        if (prompt.id === promptId) {
          return {
            ...prompt,
            answers: [...prompt.answers, answer],
          };
        }
        return prompt;
      });
    });
  };

  const handleToggleEventStorming = () => {
    setEventStormingState(!eventStormingState);
  };

  const handlePromptRequest = (prompt: string) => {
    addPrompt(prompt, 1);
  };

  const handleRegenerateRequest = (promptId: number) => {
    const prompt = prompts.find((p) => p.id === promptId);
    if (!prompt) {
      return;
    }
    addAnswer(promptId, { message: "", answer: true, loading: true });
  };

  const handleRatingRequest = (
    promptId: number,
    answerIndex: number,
    rating: number
  ) => {};

  const handleEventStormingRequest = (prompt: string) => {
    addPrompt(prompt, 1);
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
