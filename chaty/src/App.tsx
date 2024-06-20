import { useState } from 'react'
import ChatButton from './ChatButton'
import ChatWindow from './ChatWindow'
import './App.css'

function App() {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false)
  return (
    <>
      {!isChatOpen && <ChatButton setIsChatOpen={setIsChatOpen} />}
      <ChatWindow isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
    </>
  );
}

export default App
