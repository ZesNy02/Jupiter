import { FC } from "react";
import "./ChatMessage.css";
import ChatMessageButton from "../ChatMessageButton";

interface ChatMessageProps {
  message: string;
  answer?: boolean;
  count?: number;
  maxCount?: number;
  error?: boolean;
}

const ChatMessage: FC<ChatMessageProps> = ({
  message,
  answer,
  count,
  maxCount,
  error,
}) => {
  return (
    <>
      <div
        className={`chatMessageWrapper ${
          answer ? "chatyMessage" : "userMessage"
        }`}
      >
        <div className={error ? "errorMessage" : "chatMessage"}>
          <p className="chatMessageContent">{message}</p>
          {answer && !error && <p>{`${count}/${maxCount}`}</p>}
        </div>
        {answer && (
          <div className="chatMessageActions">
            <ChatMessageButton
              iconPath="/ReloadIcon.svg"
              onClick={() => {}}
              active
              activeColor="#141414"
            />
            {!error && (
              <>
                <ChatMessageButton
                  iconPath="ThumbsUpIcon.svg"
                  onClick={() => {}}
                  active
                  activeColor="#141414"
                />
                <ChatMessageButton
                  iconPath="/ThumbsDownIcon.svg"
                  onClick={() => {}}
                  active
                  activeColor="#141414"
                />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ChatMessage;
