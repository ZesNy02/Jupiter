import { FC } from "react";
import "./ChatMessage.css";

interface ChatMessageProps {
  message: string;
  answer: boolean;
  count?: number;
  maxCount?: number;
}

const ChatMessage: FC<ChatMessageProps> = ({
  message,
  answer,
  count,
  maxCount,
}) => {
  return (
    <>
      <div
        className={`chatMessageWrapper ${
          answer ? "chatyMessage" : "userMessage"
        }`}
      >
        <div className="chatMessage">
          <p className="chatMessageContent">{message}</p>
          {answer && <p>{`${count}/${maxCount}`}</p>}
        </div>
        {answer && (
          <div className="chatMessageActions">
            <button className="chatMessageActionButton">
              <img src="/ReloadIcon.svg" className="chatMessageActionIcon" />
            </button>
            <button className="chatMessageActionButton">
              <img src="/ThumbsUpIcon.svg" className="chatMessageActionIcon" />
            </button>
            <button className="chatMessageActionButton">
              <img
                src="/ThumbsDownIcon.svg"
                className="chatMessageActionIcon"
              />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatMessage;
