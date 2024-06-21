import { FC, useState } from "react";
import "./ChatMessage.css";
import ChatMessageButton from "../ChatMessageButton";

interface ChatMessageProps {
  message: string;
  answer?: boolean;
  count?: number;
  maxCount?: number;
  error?: boolean;
  eventStorming?: boolean;
}

const enum MessageRating {
  THUMB_UP,
  THUMB_DOWN,
  NEUTRAL,
}

const ChatMessage: FC<ChatMessageProps> = ({
  message,
  answer,
  count,
  maxCount,
  error,
  eventStorming,
}) => {
  const [ratingState, setRatingState] = useState(MessageRating.NEUTRAL);

  const handleThumbClick = (rating: MessageRating) => {
    return () => {
      if (rating === MessageRating.NEUTRAL) {
        return;
      } else if (rating === ratingState) {
        setRatingState(MessageRating.NEUTRAL);
      } else {
        setRatingState(rating);
      }
    };
  };

  const handleReload = () => {
    console.log("Reload");
  };

  return (
    <>
      <div
        className={`chatMessageWrapper ${
          answer ? "chatyMessage" : "userMessage"
        }`}
      >
        <div className={error ? "errorMessage" : "chatMessage"}>
          <p className="chatMessageContent">{message}</p>
          {answer && !error && (
            <p className="chatMessageCount">{`${count}/${maxCount}`}</p>
          )}
        </div>
        {answer && !eventStorming && (
          <div className="chatMessageActions">
            <ChatMessageButton
              iconPath="/ReloadIcon.svg"
              onClick={handleReload}
              active={false}
              activeColor="#141414"
            />
            {!error && (
              <>
                <ChatMessageButton
                  iconPath="ThumbsUpIcon.svg"
                  onClick={handleThumbClick(MessageRating.THUMB_UP)}
                  active={ratingState === MessageRating.THUMB_UP}
                  activeColor="#14ba38"
                />
                <ChatMessageButton
                  iconPath="/ThumbsDownIcon.svg"
                  onClick={handleThumbClick(MessageRating.THUMB_DOWN)}
                  active={ratingState === MessageRating.THUMB_DOWN}
                  activeColor="#a30709"
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
