/**
 * References:
 * https://scotch.io/bar-talk/build-an-eye-tracking-alien-with-javascript-solution-to-code-challenge-4
 * https://youtu.be/Idxeo49szW0
 */

import React from "react";
import { useEventListener } from "./hooks";
import "./styles.css";

export default function App() {
  const [mouseCoordinates, setMouseCoordinates] = React.useState({
    x: 0,
    y: 0
  });
  const eyesRef = React.useRef();

  const handler = React.useCallback(
    ({ clientX, clientY }) => {
      setMouseCoordinates({ x: clientX, y: clientY });
    },
    [setMouseCoordinates]
  );

  useEventListener("mousemove", handler);

  const getEyeStyle = () => {
    if (eyesRef.current) {
      const left = eyesRef.current.getBoundingClientRect().left;
      const top = eyesRef.current.getBoundingClientRect().top;

      // distance from eyes to mouse pointer
      const mouseX = mouseCoordinates.x - left;
      const mouseY = mouseCoordinates.y - top;

      const rotationRadians = Math.atan2(mouseX, mouseY);
      const rotationDegrees = rotationRadians * (180 / Math.PI) * -1 + 180;

      return { transform: `rotate(${rotationDegrees}deg)` };
    }
  };

  return (
    <div className="mouse-area">
      <div ref={eyesRef} className="eyes">
        <div className="eye" style={getEyeStyle()} />
        <div className="eye" style={getEyeStyle()} />
      </div>
    </div>
  );
}
