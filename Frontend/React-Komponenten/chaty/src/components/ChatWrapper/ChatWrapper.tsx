import React, { FC, useEffect } from "react";
import "./ChatWrapper.css";
import ChatMessage from "../ChatMessage";
import { Answer, Prompt } from "../../types";

interface ChatWrapperProps {
  prompts: Prompt[];
}

const ChatWrapper: FC<ChatWrapperProps> = ({ prompts }) => {
  const endOfMessagesRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [prompts]);

  const getAnswers = (answers: Answer[], promptIndex: number) => {
    return answers.map((answer, answerIndex) => (
      <ChatMessage
        key={`answer-${promptIndex}-${answerIndex}`}
        message={answer}
        promptIndex={promptIndex}
        answerIndex={answerIndex}
      />
    ));
  };

  return (
    <>
      <div className="chat-wrapper">
        {prompts.map((prompt, promptIndex) => (
          <React.Fragment key={`fragment-${promptIndex}`}>
            <ChatMessage
              key={`prompt-${promptIndex}`}
              message={prompt}
              promptIndex={promptIndex}
              answerIndex={-1}
            />
            {getAnswers(prompt.answers, promptIndex)}
          </React.Fragment>
        ))}
        <div key={"end-of-message-ref"} ref={endOfMessagesRef} />
      </div>
    </>
  );
};

export default ChatWrapper;
