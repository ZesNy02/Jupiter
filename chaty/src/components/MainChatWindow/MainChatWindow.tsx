import { FC, createContext, useEffect } from "react";
import "./MainChatWindow.css";
import ChatHeader from "../ChatHeader";
import ChatWrapper from "../ChatWrapper";
import ChatInput from "../ChatInput";
import ESToggleButton from "../ESToggleButton";
import { useEventStorming } from "../../hooks/useEventStorming";
import ResizeHandle from "../ResizeHandle";
import {
  eventStormingRequestHandler,
  promptRequestHandler,
  ratingRequestHandler,
  regenerateRequestHandler,
} from "./requestHandlers";
import { useResizeHandler } from "../../hooks/useResizeHandler";
import { MessageRatingAction } from "../../types";
import { usePrompts } from "../../hooks/usePrompts";

interface MainChatWindowProps {
  onClose: () => void;
}

export interface RequestContextProps {
  handleRegenerateRequest: (promptIndex: number, prompt: string) => void;
  handleRatingRequest: (
    promptIndex: number,
    answerIndex: number,
    rating: MessageRatingAction,
    onResponse: (success: boolean) => void
  ) => void;
}

export const RequestContext = createContext<RequestContextProps | undefined>(
  undefined
);

const MainChatWindow: FC<MainChatWindowProps> = ({ onClose }) => {
  const [prompts, addPrompt, addAnswer, editAnswer] = usePrompts();
  const [eventStormingState, handleToggleEventStorming] = useEventStorming();
  const [size, resizeHandler] = useResizeHandler();

  const requestHandlers: RequestContextProps = {
    handleRegenerateRequest: regenerateRequestHandler(addAnswer, editAnswer),
    handleRatingRequest: ratingRequestHandler(prompts),
  };

  useEffect(() => {
    console.log(prompts);
  }, [prompts]);

  const handleInputSend = () => {
    if (eventStormingState) {
      return eventStormingRequestHandler(addPrompt, editAnswer);
    } else {
      return promptRequestHandler(addPrompt, editAnswer);
    }
  };

  return (
    <div
      className={`main-chat-window${eventStormingState ? " active" : ""}`}
      style={{
        width: size.width,
        height: size.height,
      }}
    >
      <ResizeHandle onMouseDown={resizeHandler} />
      <ChatHeader onClick={onClose} />
      <RequestContext.Provider value={requestHandlers}>
        <ChatWrapper prompts={prompts} />
      </RequestContext.Provider>
      <ESToggleButton
        onClick={handleToggleEventStorming}
        eventStorming={eventStormingState}
      />
      <ChatInput onSend={handleInputSend()} />
    </div>
  );
};

export default MainChatWindow;
