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
    title: "Квиз",
    imageUrl: "./game-image-synchronize.png",
  },
  {
    title: "Найди пару",
    imageUrl: "./game-image-tickets.png",
  },
  {
    title: "Пазл",
    imageUrl: "./game-image-puzzle.png",
  },
  {
    title: "Правда или Ложь",
    imageUrl: "./game-image-true-or-lie.png",
  },
  {
    title: "Квиз",
    imageUrl: "./game-image-synchronize.png",
  },
  {
    title: "Найди пару",
    imageUrl: "./game-image-tickets.png",
  },
  {
    title: "Пазл",
    imageUrl: "./game-image-puzzle.png",
  },
];

export const mockDataExercisesCard = [
  {
    id: crypto.randomUUID(),
    type: "listening",
    name: "Тренировка словаря",
    text: "Соедини слово и перевод",
    imageUrl: "/exercises-image-notepad.png",
    questions: [],
  },
  {
    id: crypto.randomUUID(),
    type: "reading",
    name: "Аудирование",
    text: "Прослушай и напиши правильно",
    imageUrl: "/exercises-image-headphones.png",
    questions: [],
    navigate: '/listening-exercises',
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
    name: "Разговор в кафе",
    description: "Прослушайте диалог и ответьте на вопросы",
    level: "A1",
    imageUrl: "/exercises-image-headphones.png",
    audioUrl: "/audio/cafe-conversation.mp3",
    progress: 50,
    questions: [
      {
        question: "Что заказал мужчина?",
        options: ["Кофе", "Чай", "Сок"],
        correct: "Кофе",
      },
      {
        question: "Где происходит разговор?",
        options: ["В парке", "В кафе", "В офисе"],
        correct: "В кафе",
      },
    ],
  },
  {
    id: "2",
    name: "Новости",
    description: "Прослушайте новостной отрывок",
    level: "B1",
    imageUrl: "/exercises-image-notepad.png",
    audioUrl: "/audio/news.mp3",
    progress: 0,
    questions: [
      {
        question: "О чём новости?",
        options: ["Погода", "Спорт", "Политика"],
        correct: "Погода",
      },
    ],
  },
];