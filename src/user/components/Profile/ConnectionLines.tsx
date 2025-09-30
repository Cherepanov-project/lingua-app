import { memo } from "react";
import { ConnectionLine } from "../Profile/ConnectionLine";
import type { Connection, ButtonPositions } from "../../../types/matchGame";

interface ConnectionLinesProps {
  connections: Connection[];
  buttonPositions: ButtonPositions;
  selectedRussian?: string | null;
  selectedEnglish?: string | null;
  isWrongSelection?: boolean;
}

export const ConnectionLines = memo<ConnectionLinesProps>(
  ({
    connections,
    buttonPositions,
    selectedRussian,
    selectedEnglish,
    isWrongSelection = false,
  }) => {
    const renderConnections = () => {
      return connections.map((connection, index) => {
        const russianPos = buttonPositions.russian[connection.russian];
        const englishPos = buttonPositions.english[connection.english];

        if (!russianPos || !englishPos) return null;

        return (
          <ConnectionLine
            key={`connection-${index}`}
            startX={russianPos.x}
            startY={russianPos.y}
            endX={englishPos.x}
            endY={englishPos.y}
            isCorrect={connection.isCorrect}
          />
        );
      });
    };

    const renderTemporaryConnection = () => {
      if (!selectedRussian || !selectedEnglish) return null;

      const russianPos = buttonPositions.russian[selectedRussian];
      const englishPos = buttonPositions.english[selectedEnglish];

      if (!russianPos || !englishPos) return null;

      return (
        <ConnectionLine
          startX={russianPos.x}
          startY={russianPos.y}
          endX={englishPos.x}
          endY={englishPos.y}
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
