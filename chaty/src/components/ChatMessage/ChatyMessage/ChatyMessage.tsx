import { FC, useContext } from "react";
import { Answer, MessageRating } from "../../../types";
import ChatMessageButton from "../../ChatMessageButton";
import {
  RequestContext,
  RequestContextProps,
} from "../../MainChatWindow/MainChatWindow";
import { useRatingState } from "../../../hooks/useRatingState";

interface ChatyMessageProps {
  response: Answer;
  promptIndex: number;
  answerIndex: number;
}

const ChatyMessage: FC<ChatyMessageProps> = ({
  response,
  promptIndex,
  answerIndex,
}) => {
  const {
    message,
    count,
    maxCount,
    error,
    eventStorming,
    loading,
    fromPrompt,
  } = response;

  const [ratingState, handleThumbClick] = useRatingState(
    promptIndex,
    answerIndex
  );

  const { handleRegenerateRequest } = useContext(
    RequestContext
  ) as RequestContextProps;

  const handleReload = () => {
    handleRegenerateRequest(promptIndex, fromPrompt as string);
  };

  return (
    <>
      <div className={"chat-message-wrapper chaty-message"}>
        <div className={error && !loading ? "error-message" : "chat-message"}>
          {loading && (
            <div className="chat-message-loading">
              <img
                src="/LoadingIcon.svg"
                className="chat-message-loading-icon"
              />
            </div>
          )}

          {!loading && (
            <>
              <p className="chat-message-content">{message}</p>
              {!error && (
                <p className="chat-message-count">{`${count}/${maxCount}`}</p>
              )}
            </>
          )}
        </div>
        {!eventStorming && !loading && (
          <div className="chat-message-actions">
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
                  activeColor="#14ba38 !important"
                />
                <ChatMessageButton
                  iconPath="/ThumbsDownIcon.svg"
                  onClick={handleThumbClick(MessageRating.THUMB_DOWN)}
                  active={ratingState === MessageRating.THUMB_DOWN}
                  activeColor="#a30709 !important"
                />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ChatyMessage;
