import { useCallback, useState } from "react";

export const useResizeHandler = (): [
  { width: number; height: number },
  (event: React.MouseEvent<HTMLButtonElement>) => void
] => {
  // Step 1: Track the size state
  const [size, setSize] = useState({ width: 600, height: 500 }); // Default size

  // Mouse down event handler
  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      // Prevent default action and bubbling
      event.preventDefault();
      event.stopPropagation();

      const startX = event.clientX;
      const startY = event.clientY;
      const startWidth = size.width;
      const startHeight = size.height;

      // Mouse move event handler
      const handleMouseMove = (moveEvent: MouseEvent) => {
        // Calculate the new size
        const newWidth = startWidth + moveEvent.clientX - startX;
        const newHeight = startHeight - (moveEvent.clientY - startY);
        setSize({ width: newWidth, height: newHeight });
      };

      // Mouse up event handler to clean up event listeners
      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      // Attach event listeners to document to allow for drag outside component
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [size]
  );

  return [size, handleMouseDown];
};
