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
      <div className="eventstorming-wrapper">
        <button
          className={`toggle-button-wrapper${eventStorming ? " active" : ""}`}
          onClick={onClick}
        >
          <div
            className={`toggle-button-background${
              eventStorming ? " active" : ""
            }`}
          >
            <span
              className={`toggle-button-point${eventStorming ? " active" : ""}`}
            ></span>
          </div>
        </button>
        <h2 className="eventstorming-title">
          {eventStorming ? "Event Storming" : "Event Storming"}
        </h2>
      </div>
    </>
  );
};

export default ESToggleButton;
