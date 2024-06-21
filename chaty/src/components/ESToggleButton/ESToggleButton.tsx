import { FC } from "react";
import "./ESToggleButton.css";

interface ESToggleButtonProps {
  onClick: () => void;
  eventStorming?: boolean;
}

const ESToggleButton: FC<ESToggleButtonProps> = ({
  onClick,
  eventStorming,
}) => {
  return (
    <>
      <div className="eventstormingWrapper">
        <button
          className={`toggleButtonWrapper${eventStorming ? " active" : ""}`}
          onClick={onClick}
        >
          <div
            className={`toggleButtonBackground${
              eventStorming ? " active" : ""
            }`}
          >
            <span
              className={`toggleButtonPoint${eventStorming ? " active" : ""}`}
            ></span>
          </div>
        </button>
        <h2 className="eventstormingTitle">
          {eventStorming ? "Event Storming" : "Chat"}
        </h2>
      </div>
    </>
  );
};

export default ESToggleButton;
