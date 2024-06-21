import { FC } from "react";
import "./ESToggleButton.css";

interface ESToggleButtonProps {
  onClick: () => void;
}

const ESToggleButton: FC<ESToggleButtonProps> = ({ onClick }) => {
  return (
    <>
      <div className="eventstormingWrapper">
        <button className="toggleButtonWrapper" onClick={onClick}>
          <div className="toggleButtonBackground">
            <span className="toggleButtonPoint"></span>
          </div>
        </button>
        <h2 className="eventstormingTitle"></h2>
      </div>
    </>
  );
};

export default ESToggleButton;
