import { FC } from "react";
import { Answer, Prompt } from "../../types";
import ChatyMessage from "./ChatyMessage";
import "./ChatMessage.css";
import UserMessage from "./UserMessage";

interface ChatMessageProps {
  message: Prompt | Answer;
  promptIndex: number;
  answerIndex: number;
}

const ChatMessage: FC<ChatMessageProps> = ({
  message,
  promptIndex,
  answerIndex,
}) => {
  return (
    <>
      {"answer" in message ? (
        <ChatyMessage
          response={message}
          promptIndex={promptIndex}
          answerIndex={answerIndex}
        />
      ) : (
        <UserMessage prompt={message as Prompt} />
      )}
    </>
  );
};

export default ChatMessage;
