import { FC } from "react";
import "./ChatInput.css";

interface ChatInputProps {
  eventStorming?: boolean;
}

const ChatInput: FC<ChatInputProps> = ({ eventStorming }) => {
  return (
    <>
      <div className="chatInputWrapper">
        <input
          type="text"
          className="chatInput"
          placeholder={
            eventStorming
              ? "Write your topic here..."
              : "Write your question here..."
          }
        />
        <button className="chatInputSendButton">
          <img src="/ChatInputIcon.svg" className="chatInputSendButtonIcon" />
        </button>
      </div>
    </>
  );
};

export default ChatInput;
