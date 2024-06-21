import { FC } from "react";
import "./ChatWrapper.css";
import ChatMessage from "../ChatMessage";

export interface Prompt {
  message: string;
  answers: Answer[];
}

export interface Answer {
  message: string;
  answer: boolean;
  error: boolean;
  eventStorming: boolean;
  count: number;
  maxCount: number;
}

interface ChatWrapperProps {
  prompts: Prompt[];
}

const ChatWrapper: FC<ChatWrapperProps> = ({ prompts }) => {
  const getAnswers = (answers: Answer[]) => {
    return answers.map((answer, answerIndex) => (
      <ChatMessage key={answerIndex} {...answer} />
    ));
  };

  return (
    <>
      <div className="chatWrapper">
        {prompts.map((prompt, promptIndex) => (
          <>
            <ChatMessage key={promptIndex} message={prompt.message} />
            {getAnswers(prompt.answers)}
          </>
        ))}
      </div>
    </>
  );
};

export default ChatWrapper;
