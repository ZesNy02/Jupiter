import { FC } from "react";
import { Prompt } from "../../../types";

interface UserMessageProps {
  prompt: Prompt;
}

const UserMessage: FC<UserMessageProps> = ({ prompt }) => {
  return (
    <>
      <div className={"chat-message-wrapper user-message"}>
        <div className={"chat-message"}>
          <p className="chat-message-content">{prompt.message}</p>
        </div>
      </div>
    </>
  );
};

export default UserMessage;
