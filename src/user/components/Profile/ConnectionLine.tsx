import { Box } from "@mui/material";

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
  const color = isCorrect ? "#4CAF50" : "#ff6b6b";

  const dx = endX - startX;
  const dy = endY - startY;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return (
    <Box
      sx={{
        position: "absolute",
        top: startY,
        left: startX,
        width: length,
        height: "3px",
        backgroundColor: color,
        transform: `rotate(${angle}deg)`,
        transformOrigin: "0 0",
        zIndex: 1,
        pointerEvents: "none",
        "&::after": {
          content: '""',
          position: "absolute",
          right: "-8px",
          top: "-5px",
          width: 0,
          height: 0,
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderTop: `10px solid ${color}`,
          transform: "rotate(90deg)",
        },
      }}
    />
  );
};
