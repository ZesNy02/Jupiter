import React, { FC, useEffect } from "react";
import "./ChatWrapper.css";
import ChatMessage from "../ChatMessage";

export interface Prompt {
  message: string;
  id: number;
  answers: Answer[];
}

export interface Answer {
  message: string;
  answer: boolean;
  error: boolean;
  eventStorming: boolean;
  count: number;
  maxCount: number;
  loading: boolean;
}

interface ChatWrapperProps {
  prompts: Prompt[];
}

const ChatWrapper: FC<ChatWrapperProps> = ({ prompts }) => {
  const endOfMessagesRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [prompts]);

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
        <div ref={endOfMessagesRef} />
      </div>
    </>
  );
};

export default ChatWrapper;
