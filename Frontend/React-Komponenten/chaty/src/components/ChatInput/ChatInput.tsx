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

  const handleSend = async () => {
    onSend(inputText);
    setInputText("");
  };

  return (
    <>
      <div className="chat-input-wrapper">
        <input
          type="text"
          className="chat-input"
          placeholder={
            eventStorming
              ? "Write your topic here..."
              : "Write your question here..."
          }
          value={inputText}
          onKeyUp={handlePressEnter}
          onChange={handleTextChange}
        />
        <button className="chat-input-send-button" onClick={handleSend}>
          <img
            src="/ChatInputIcon.svg"
            className="chat-input-send-button-icon"
          />
        </button>
      </div>
    </>
  );
};

export default ChatInput;
