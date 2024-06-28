import { useState } from "react";
import "./App.css";
import ChatButton from "./components/ChatButton";
import MainChatWindow from "./components/MainChatWindow";
import { useEventStorming } from "./hooks/useEventStorming";

function App() {
  const [chatWindowState, setChatWindowState] = useState(false);
  const [eventStormingState, handleToggleEventStorming] = useEventStorming();

  const handleOpenChatWindow = () => {
    setChatWindowState(true);
  };

  const handleCloseChatWindow = () => {
    setChatWindowState(false);
  };

  return (
    <>
      {!chatWindowState && (
        <ChatButton
          onClick={handleOpenChatWindow}
          eventStorming={eventStormingState}
        />
      )}
      {chatWindowState && (
        <MainChatWindow
          onClose={handleCloseChatWindow}
          eventStorming={eventStormingState}
          toggleEventStorming={handleToggleEventStorming}
        />
      )}
    </>
  );
}

export default App;
