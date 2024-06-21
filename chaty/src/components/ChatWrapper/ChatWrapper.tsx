import { FC } from "react";
import "./ChatWrapper.css";
import ChatMessage from "../ChatMessage";

interface ChatWrapperProps {}

const ChatWrapper: FC<ChatWrapperProps> = ({}) => {
  const list = ["message", "message", "message"];
  return (
    <>
      <div className="chatWrapper">
        {list.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            answer={index % 2 === 0}
            count={index}
            maxCount={list.length}
          />
        ))}
      </div>
    </>
  );
};

export default ChatWrapper;
