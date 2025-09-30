import React from "react";

interface ConnectionLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isCorrect: boolean;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({
  startX,
  startY,
  endX,
  endY,
  isCorrect,
}) => {
  const strokeColor = isCorrect ? "#4CAF50" : "#ff6b6b";
  const strokeWidth = 3;

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        opacity={0.8}
      />
    </svg>
  );
};
