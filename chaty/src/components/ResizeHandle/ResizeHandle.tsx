import React, { FC } from "react";
import "./ResizeHandle.css";

interface ResizeHandleProps {
  onMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => void;
  eventStorming?: boolean;
}

const ResizeHandle: FC<ResizeHandleProps> = ({
   onMouseDown,
   eventStorming,
  }) => {
  return (
    <>
      <button className={`chat-window-resize-button${eventStorming ? " active" : ""}`} onMouseDown={onMouseDown}>
        <img src="/ResizeIcon.svg" className="chat-window-resize-icon" />
      </button>
    </>
  );
};

export default ResizeHandle;
