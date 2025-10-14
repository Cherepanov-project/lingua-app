import { memo } from "react";
import { ConnectionLine } from "../Profile/ConnectionLine";
import type { Connection, ButtonPositions } from "../../../types/matchGame";

interface ConnectionLinesProps {
  connections: Connection[];
  buttonPositions: ButtonPositions;
  selectedLeft?: string | null;
  selectedRight?: string | null;
  isWrongSelection?: boolean;
}

export const ConnectionLines = memo<ConnectionLinesProps>(
  ({
    connections,
    buttonPositions,
    selectedLeft,
    selectedRight,
    isWrongSelection = false,
  }) => {
    const renderConnections = () => {
      return connections.map((connection, index) => {
        const leftPos = buttonPositions.left[connection.left];
        const rightPos = buttonPositions.right[connection.right];

        if (!leftPos || !rightPos) return null;

        return (
          <ConnectionLine
            key={`connection-${index}`}
            startX={leftPos.x}
            startY={leftPos.y}
            endX={rightPos.x}
            endY={rightPos.y}
            isCorrect={connection.isCorrect}
          />
        );
      });
    };

    const renderTemporaryConnection = () => {
      if (!selectedLeft || !selectedRight) return null;

      const leftPos = buttonPositions.left[selectedLeft];
      const rightPos = buttonPositions.right[selectedRight];

      if (!leftPos || !rightPos) return null;

      return (
        <ConnectionLine
          startX={leftPos.x}
          startY={leftPos.y}
          endX={rightPos.x}
          endY={rightPos.y}
          isCorrect={!isWrongSelection}
        />
      );
    };

    return (
      <>
        {renderConnections()}
        {renderTemporaryConnection()}
      </>
    );
  }
);

ConnectionLines.displayName = "ConnectionLines";
