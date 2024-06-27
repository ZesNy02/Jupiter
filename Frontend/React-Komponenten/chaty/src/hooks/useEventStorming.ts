import { useState } from "react";

export const useEventStorming = (): [boolean, () => void] => {
  const [eventStormingState, setEventStormingState] = useState(false);
  const handleToggleEventStorming = () => {
    setEventStormingState(!eventStormingState);
  };
  return [eventStormingState, handleToggleEventStorming];
};
