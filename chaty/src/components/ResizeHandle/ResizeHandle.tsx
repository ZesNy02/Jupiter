import React, { FC } from "react";
import "./ResizeHandle.css";

interface ResizeHandleProps {
  onMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ResizeHandle: FC<ResizeHandleProps> = ({ onMouseDown }) => {
  return (
    <>
      <button className="chat-window-resize-button" onMouseDown={onMouseDown}>
        <img src="/ResizeIcon.svg" className="chat-window-resize-icon" />
      </button>
    </>
  );
};

export default ResizeHandle;
