import React, { useState, useEffect, useRef } from 'react';
import './chatWindow.css';

// Typdefinitionen für die Props
interface ChatWindowProps {
  isChatOpen: boolean;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isChatOpen, setIsChatOpen }) => {
  const [message, setMessage] = useState<string>('');
  const [width, setWidth] = useState<string>('30vw'); // Initial width
  const [height, setHeight] = useState<string>('50vh'); // Initial height

  const chatWindowRef = useRef<HTMLDivElement | null>(null); // Ref for chat window container
  const resizeHandleRef = useRef<HTMLDivElement | null>(null); // Ref for resize handle

  useEffect(() => {
    const container = chatWindowRef.current;
    const resizeHandle = resizeHandleRef.current;

    let isResizing = false;
    let startX: number, startY: number, startWidth: number, startHeight: number;

    const resize = (e: MouseEvent) => {
      if (isResizing) {
        const newWidth = startWidth + (e.clientX - startX);
        const newHeight = startHeight + (startY - e.clientY);

        if (container) {
          container.style.width = `${newWidth}px`;
          container.style.height = `${newHeight}px`;
          setWidth(`${newWidth}px`);
          setHeight(`${newHeight}px`);
        }
      }
    };

    const stopResize = () => {
      isResizing = false;
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResize);
    };

    if (!container || !resizeHandle) return;

    resizeHandle.addEventListener('mousedown', (e: MouseEvent) => {
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = container.offsetWidth;
      startHeight = container.offsetHeight;

      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stopResize);
    });

    return () => {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResize);
    };
  }, []);

  const toggleWindow = () => {
    setIsChatOpen(false);
  };

  const sendMessage = () => {
    // Handle sending message here
    setMessage('');
  };

  return isChatOpen ? (
    <div ref={chatWindowRef} className="chat-window" style={{ width, height }}>
      <div id="chatHeader" className="chat-header">
        <h2 id='chatyName'>Chaty</h2>
        <button id="closeButton" onClick={toggleWindow}>
          X
        </button>
      </div>
      <div className="wrapper-prompts-container">
        <div id="prompts-container" className="prompts-container">
          {/* Prompt content here */}
        </div>
      </div>
      <div className="wrapper-chat-input">
        <div className="chat-input-div">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Type your message here"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
      <div ref={resizeHandleRef} className="resize-handle">
        {/* Resize handle SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-1.92 -1.92 27.84 27.84"
          fill="#D9D9D9"
          transform="matrix(1, 0, 0, -1, 0, 0)rotate(0)"
        >
          <path
            d="M21 15L15 21M21 8L8 21"
            stroke="#D9D9D9"
            strokeWidth="1.6799999999999997"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  ) : null;
};

export default ChatWindow;
