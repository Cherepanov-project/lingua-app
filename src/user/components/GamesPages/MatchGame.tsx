import { Box, Button, Typography, Tooltip } from "@mui/material";
import { useState, useEffect, useRef } from "react";

const boxWordsStyles = {
  display: "flex",
  flexDirection: "column",
  gap: 2.5,
  width: "auto",
  height: "100%",
};

const gameLevels = [
  {
    level: 1,
    pairs: [
      { russian: "Яблоко", english: "Apple" },
      { russian: "Машина", english: "Car" },
      { russian: "Дом", english: "House" },
      { russian: "Собака", english: "Dog" },
      { russian: "Кошка", english: "Cat" },
    ],
  },
  {
    level: 2,
    pairs: [
      { russian: "Вода", english: "Water" },
      { russian: "Огонь", english: "Fire" },
      { russian: "Земля", english: "Earth" },
      { russian: "Воздух", english: "Air" },
      { russian: "Дерево", english: "Tree" },
    ],
  },
  {
    level: 3,
    pairs: [
      { russian: "Книга", english: "Book" },
      { russian: "Стул", english: "Chair" },
      { russian: "Стол", english: "Table" },
      { russian: "Окно", english: "Window" },
      { russian: "Дверь", english: "Door" },
    ],
  },
  {
    level: 4,
    pairs: [
      { russian: "Солнце", english: "Sun" },
      { russian: "Луна", english: "Moon" },
      { russian: "Звезда", english: "Star" },
      { russian: "Небо", english: "Sky" },
      { russian: "Облако", english: "Cloud" },
    ],
  },
  {
    level: 5,
    pairs: [
      { russian: "Рыба", english: "Fish" },
      { russian: "Птица", english: "Bird" },
      { russian: "Лошадь", english: "Horse" },
      { russian: "Корова", english: "Cow" },
      { russian: "Свинья", english: "Pig" },
    ],
  },
  {
    level: 6,
    pairs: [
      { russian: "Красный", english: "Red" },
      { russian: "Синий", english: "Blue" },
      { russian: "Зеленый", english: "Green" },
      { russian: "Желтый", english: "Yellow" },
      { russian: "Черный", english: "Black" },
    ],
  },
  {
    level: 7,
    pairs: [
      { russian: "Большой", english: "Big" },
      { russian: "Маленький", english: "Small" },
      { russian: "Быстрый", english: "Fast" },
      { russian: "Медленный", english: "Slow" },
      { russian: "Высокий", english: "Tall" },
    ],
  },
  {
    level: 8,
    pairs: [
      { russian: "Еда", english: "Food" },
      { russian: "Напиток", english: "Drink" },
      { russian: "Хлеб", english: "Bread" },
      { russian: "Молоко", english: "Milk" },
      { russian: "Мясо", english: "Meat" },
    ],
  },
  {
    level: 9,
    pairs: [
      { russian: "Семья", english: "Family" },
      { russian: "Мать", english: "Mother" },
      { russian: "Отец", english: "Father" },
      { russian: "Сестра", english: "Sister" },
      { russian: "Брат", english: "Brother" },
    ],
  },
  {
    level: 10,
    pairs: [
      { russian: "Школа", english: "School" },
      { russian: "Учитель", english: "Teacher" },
      { russian: "Ученик", english: "Student" },
      { russian: "Урок", english: "Lesson" },
      { russian: "Домашнее задание", english: "Homework" },
    ],
  },
];

interface Connection {
  russian: string;
  english: string;
  isCorrect: boolean;
}

export const MatchGame = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [selectedRussian, setSelectedRussian] = useState<string | null>(null);
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isWrongSelection, setIsWrongSelection] = useState(false);
  const timerRef = useRef<number | null>(null);

  const currentLevelData = gameLevels[currentLevel - 1];
  const russianWords = currentLevelData.pairs.map((pair) => pair.russian);
  const englishWords = currentLevelData.pairs.map((pair) => pair.english);

  const [shuffledRussian, setShuffledRussian] = useState<string[]>([]);
  const [shuffledEnglish, setShuffledEnglish] = useState<string[]>([]);

  useEffect(() => {
    setShuffledRussian([...russianWords].sort(() => Math.random() - 0.5));
    setShuffledEnglish([...englishWords].sort(() => Math.random() - 0.5));
  }, [currentLevel]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const toggleRussian = (word: string) => {
    if (selectedRussian === word) {
      setSelectedRussian(null);
    } else {
      setSelectedRussian(word);
      if (selectedEnglish) {
        checkConnection(word, selectedEnglish);
      }
    }
  };

  const toggleEnglish = (word: string) => {
    if (selectedEnglish === word) {
      setSelectedEnglish(null);
    } else {
      setSelectedEnglish(word);
      if (selectedRussian) {
        checkConnection(selectedRussian, word);
      }
    }
  };

  const resetSelection = () => {
    setSelectedRussian(null);
    setSelectedEnglish(null);
    setIsWrongSelection(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const checkConnection = (russianWord: string, englishWord: string) => {
    const correctPair = currentLevelData.pairs.find(
      (pair) => pair.russian === russianWord && pair.english === englishWord
    );

    if (correctPair) {
      setConnections((prev) => {
        const newConnections = [
          ...prev,
          {
            russian: russianWord,
            english: englishWord,
            isCorrect: true,
          },
        ];

        if (newConnections.length === currentLevelData.pairs.length) {
          setGameCompleted(true);
        }

        return newConnections;
      });
      setSelectedRussian(null);
      setSelectedEnglish(null);
    } else {
      setIsWrongSelection(true);

      timerRef.current = setTimeout(() => {
        resetSelection();
      }, 500);
    }
  };

  const restartGame = () => {
    setCurrentLevel(1);
    resetSelection();
    setConnections([]);
    setShowAnswers(false);
    setGameCompleted(false);
    setShuffledRussian(
      [...gameLevels[0].pairs.map((pair) => pair.russian)].sort(
        () => Math.random() - 0.5
      )
    );
    setShuffledEnglish(
      [...gameLevels[0].pairs.map((pair) => pair.english)].sort(
        () => Math.random() - 0.5
      )
    );
  };

  const nextLevel = () => {
    if (currentLevel < 10) {
      setCurrentLevel((prev) => prev + 1);
      resetSelection();
      setConnections([]);
      setShowAnswers(false);
      setGameCompleted(false);
    }
  };

  const toggleShowAnswers = () => {
    setShowAnswers((prev) => !prev);
  };

  const isWordSelected = (word: string, type: "russian" | "english") => {
    return type === "russian"
      ? selectedRussian === word
      : selectedEnglish === word;
  };

  const getWordStatus = (word: string, type: "russian" | "english") => {
    if (isWordSelected(word, type)) return "selected";
    if (
      connections.some((conn) =>
        type === "russian" ? conn.russian === word : conn.english === word
      )
    )
      return "connected";
    return "normal";
  };

  if (shuffledRussian.length === 0 || shuffledEnglish.length === 0) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexGrow: 1,
          my: 2,
          gap: "265px",
        }}
      >
        <Box sx={boxWordsStyles}>
          {shuffledRussian.map((word, index) => {
            const status = getWordStatus(word, "russian");
            const backgroundColor =
              status === "selected"
                ? isWrongSelection
                  ? "#ff6b6b"
                  : "#FFD186"
                : status === "connected"
                  ? "#FFD186"
                  : "background.paper";

            return (
              <Button
                key={`${word}-${index}`}
                onClick={() => toggleRussian(word)}
                variant="contained"
                sx={{
                  backgroundColor,
                  "&:hover": {
                    backgroundColor: isWrongSelection ? "#ff6b6b" : "#FFD186",
                  },
                  height: 70,
                  width: 400,
                  borderRadius: 40,
                  fontSize: 30,
                  transition: "all 0.3s ease",
                }}
              >
                {word}
              </Button>
            );
          })}
        </Box>

        <Box sx={boxWordsStyles}>
          {shuffledEnglish.map((word, index) => {
            const status = getWordStatus(word, "english");
            const backgroundColor =
              status === "selected"
                ? isWrongSelection
                  ? "#ff6b6b"
                  : "#FF86C1"
                : status === "connected"
                  ? "#FF86C1"
                  : "background.paper";

            return (
              <Button
                key={`${word}-${index}`}
                onClick={() => toggleEnglish(word)}
                variant="contained"
                sx={{
                  backgroundColor,
                  "&:hover": {
                    backgroundColor: isWrongSelection ? "#ff6b6b" : "#FF86C1",
                  },
                  height: 70,
                  width: 400,
                  borderRadius: 40,
                  fontSize: 30,
                  transition: "all 0.3s ease",
                }}
              >
                {word}
              </Button>
            );
          })}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 9,
            width: "100%",
          }}
        >
          <Tooltip
            title={
              <Box sx={{ p: 1 }}>
                {currentLevelData.pairs.map((pair, index) => (
                  <Typography
                    key={index}
                    sx={{ color: "white", fontSize: "14px" }}
                  >
                    {pair.russian} - {pair.english}
                  </Typography>
                ))}
              </Box>
            }
            open={showAnswers}
            onClose={() => setShowAnswers(false)}
            placement="top"
            arrow
          >
            <Button
              variant="contained"
              onClick={toggleShowAnswers}
              sx={{
                borderRadius: "50px",
                textTransform: "none",
                fontSize: 24,
                padding: "10px 30px",
                backgroundColor: showAnswers ? "#4CAF50" : "background.paper",
                color: showAnswers ? "white" : "text.secondary",
                "&:hover": {
                  backgroundColor: showAnswers ? "#45a049" : "background.paper",
                },
                width: 300,
                height: 70,
              }}
            >
              {showAnswers ? "Скрыть ответы" : "Показать ответы"}
            </Button>
          </Tooltip>

          <Button
            variant="contained"
            onClick={restartGame}
            sx={{
              borderRadius: "50px",
              textTransform: "none",
              fontSize: 24,
              padding: "10px 30px",
              backgroundColor: "background.paper",
              color: "text.primary",
              "&:hover": { backgroundColor: "#f5f5f5" },
              width: 300,
              height: 70,
            }}
          >
            Перезапустить
          </Button>

          <Button
            variant="contained"
            onClick={nextLevel}
            disabled={!gameCompleted || currentLevel >= 10}
            sx={{
              borderRadius: "50px",
              textTransform: "none",
              fontSize: 20,
              padding: "10px 30px",
              backgroundColor:
                gameCompleted && currentLevel < 10 ? "#7E94F9" : "#ccc",
              color: "text.primary",
              "&:hover": {
                backgroundColor:
                  gameCompleted && currentLevel < 10 ? "#6B7FD7" : "#ccc",
              },
              width: 300,
              height: 70,
            }}
          >
            {currentLevel >= 10 ? "Игра завершена!" : "Следующий уровень"}
          </Button>
        </Box>
        <Typography
          sx={{ mb: 3, color: "#878787", marginTop: "20px", fontSize: 24 }}
        >
          <Box component="span" sx={{ fontWeight: "bold", color: "#303030" }}>
            {currentLevel}/10
          </Box>{" "}
          пройдено
        </Typography>
      </Box>
    </>
  );
};
