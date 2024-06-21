import { FC, useState } from "react";
import "./ChatInput.css";

interface ChatInputProps {
  eventStorming?: boolean;
  onSend: (promt: string) => void;
}

const ChatInput: FC<ChatInputProps> = ({ eventStorming, onSend }) => {
  const [inputText, setInputText] = useState("");

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handlePressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = () => {
    onSend(inputText);
    setInputText("");
  };

  return (
    <>
      <div className="chatInputWrapper">
        <input
          type="text"
          className="chatInput"
          placeholder={
            eventStorming
              ? "Write your topic here..."
              : "Write your question here..."
          }
          value={inputText}
          onKeyUp={handlePressEnter}
          onChange={handleTextChange}
        />
        <button className="chatInputSendButton" onClick={handleSend}>
          <img src="/ChatInputIcon.svg" className="chatInputSendButtonIcon" />
        </button>
      </div>
    </>
  );
};

export default ChatInput;
