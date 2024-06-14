import { useState } from 'react';
import ChatButton from './chatButton';
import ChatWindow from './chatWindow';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  console.log('isChatOpen:', isChatOpen);

  return (
    <>
      {!isChatOpen && <ChatButton setIsChatOpen={setIsChatOpen} />}
      <ChatWindow isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
    </>
  );
}

export default App;
