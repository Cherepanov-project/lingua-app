export const mockDataGrammarSlider = [
  {
    title: "Present Simple",
    imageUrl: "./grammar-image-document.png",
  },
  {
    title: "Present Perfect",
    imageUrl: "./grammar-image-document.png",
  },
  {
    title: "Past Simple",
    imageUrl: "./grammar-image-document.png",
  },
  {
    title: "Present Simple",
    imageUrl: "./grammar-image-document.png",
  },
  {
    title: "Present Perfect",
    imageUrl: "./grammar-image-document.png",
  },
  {
    title: "Past Simple",
    imageUrl: "./grammar-image-document.png",
  },
];

export const mockDataGamesSlider = [
  {
    id: crypto.randomUUID(),
    title: "Правда или Ложь",
    imageUrl: "./game-image-true-or-lie.png",
    link: "/truth-or-lie",
  },

  {
    id: crypto.randomUUID(),
    title: "Найди пару",
    imageUrl: "./game-image-tickets.png",
    link: "/games/matchgame",
  },
  {
    id: crypto.randomUUID(),
    title: "Квиз",
    imageUrl: "./game-image-synchronize.png",
    link: "#",
  },
  {
    id: crypto.randomUUID(),
    title: "Пазл",
    imageUrl: "./game-image-puzzle.png",
    link: "#",
  },

  {
    id: crypto.randomUUID(),
    title: "Правда или Ложь",
    imageUrl: "./game-image-true-or-lie.png",
    link: "/truth-or-lie",
  },

  {
    id: crypto.randomUUID(),
    title: "Найди пару",
    imageUrl: "./game-image-tickets.png",
    link: "/games/matchgame",
  },
  {
    id: crypto.randomUUID(),
    title: "Квиз",
    imageUrl: "./game-image-synchronize.png",
    link: "#",
  },
  {
    id: crypto.randomUUID(),
    title: "Пазл",
    imageUrl: "./game-image-puzzle.png",
    link: "#",
  },
];

export const mockDataExercisesCard = [
  {
    id: crypto.randomUUID(),
    type: "reading",
    name: "Тренировка словаря",
    text: "Соедини слово и перевод",
    imageUrl: "/exercises-image-notepad.png",
    questions: [],
  },
  {
    id: crypto.randomUUID(),
    type: "listening",
    name: "Аудирование",
    text: "Прослушай и напиши правильно",
    imageUrl: "/exercises-image-headphones.png",
    questions: [],
    navigate: "/profile/exercises/listening",
  },
  {
    id: crypto.randomUUID(),
    type: "reading",
    name: "Правописание",
    text: "Напиши слово правильно",
    imageUrl: "/exercises-image-pencil.png",
    questions: [],
  },
];

export const mockListeningExercises = [
  {
    id: "1",
    name: "Семья",
    description: "Прослушайте монолог и ответьте на вопросы",
    level: "A1",
    imageUrl: "/exercises-image-headphones.png",
    audioUrl: "../../../../public/mp3/family.mp3",
    progress: false,
    questions: [
      {
        question: "Как зовут говорящего?",
        options: [
          "Доминик в Торенте",
          "Доминик Торетто",
          "Владими Владимирович",
        ],
        correct: "Доминик Торетто",
      },
      {
        question: "Где происходит разговор?",
        options: ["Форсаж", "Новости", "Чайхана"],
        correct: "Форсаж",
      },
    ],
  },
  {
    id: "2",
    name: "Новости",
    description: "Прослушайте новостной отрывок",
    level: "B1",
    imageUrl: "/exercises-image-notepad.png",
    audioUrl: "../../../../public/mp3/family.mp3",
    progress: false,
    questions: [
      {
        question: "О чём новости?",
        options: ["Погода", "Спорт", "Политика"],
        correct: "Погода",
      },
    ],
  },
];
