import { useState } from "react";
import "./App.css";
import ChatButton from "./components/ChatButton";
import MainChatWindow from "./components/MainChatWindow";

function App() {
  const [chatWindowState, setChatWindowState] = useState(false);

  const handleOpenChatWindow = () => {
    setChatWindowState(true);
  };

  const handleCloseChatWindow = () => {
    setChatWindowState(false);
  };

  return (
    <>
      {!chatWindowState && <ChatButton onClick={handleOpenChatWindow} />}
      {chatWindowState && <MainChatWindow onClose={handleCloseChatWindow} />}
    </>
  );
}

export default App;
