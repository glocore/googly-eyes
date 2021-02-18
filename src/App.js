/**
 * References:
 * https://scotch.io/bar-talk/build-an-eye-tracking-alien-with-javascript-solution-to-code-challenge-4
 * https://youtu.be/Idxeo49szW0
 */

import React from "react";
import { useEventListener } from "./hooks";
import "./styles.css";

export default function App() {
  const [eyes, setEyes] = React.useState([
    {
      left: "calc(50% - 50px)",
      top: "calc(50% - 50px)"
    }
  ]);
  const [mouseCoordinates, setMouseCoordinates] = React.useState({
    x: 0,
    y: 0
  });

  const handler = React.useCallback(
    ({ clientX, clientY }) => {
      setMouseCoordinates({ x: clientX, y: clientY });
    },
    [setMouseCoordinates]
  );

  const clickHandler = React.useCallback(
    ({ clientX, clientY }) => {
      setEyes(
        eyes.concat({
          left: `calc(${clientX}px - 50px)`,
          top: `calc(${clientY}px - 25px)`
        })
      );
    },
    [eyes]
  );

  const reset = () => {
    setEyes([]);
  };

  useEventListener("mousemove", handler);
  useEventListener("mousedown", clickHandler);

  return (
    <div className="mouse-area">
      {eyes.map((eye, index) => (
        <Eyes mouseCoordinates={mouseCoordinates} style={eye} key={index} />
      ))}
      <span className="background-text">Click to add googly eyes!</span>
      <button className="clear-button" onClick={reset}>
        CLEAR
      </button>
    </div>
  );
}

const Eyes = ({ mouseCoordinates, ...rest }) => {
  const eyesRef = React.useRef();

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
    <div ref={eyesRef} className="eyes" {...rest}>
      <div className="eye" style={getEyeStyle()} />
      <div className="eye" style={getEyeStyle()} />
    </div>
  );
};
