export const mockDataGrammar = [
  {
    id: crypto.randomUUID(),
    title: "Present Simple",
    slug: "present-simple",
    link: "/profile/grammar/present-simple",
    text: "Время Present Simple обозначает действие в настоящем в широком смысле слова. Оно употребляется для обозначения обычных, регулярно повторяющихся или постоянных действий.",
    imageUrl: "./grammar-image-document.png",
  },
  {
    id: crypto.randomUUID(),
    title: "Past Simple",
    slug: "past-simple",
    link: "/profile/grammar/past-simple",
    text: "Время Past Simple используется для обозначения действия, которое произошло в определенное время в прошлом и время совершения которого уже истекло.",
    imageUrl: "./grammar-image-document.png",
  },
  {
    id: crypto.randomUUID(),
    title: "Future Simple",
    slug: "future-simple",
    link: "/profile/grammar/future-simple",
    text: "Время Future Simple ссылается на действие, которое совершится в неопределенном или отдаленном будущем.",
    imageUrl: "./grammar-image-document.png",
  },
  {
    id: crypto.randomUUID(),
    title: "Present Continuous",
    slug: "present-continuous",
    link: "/profile/grammar/present-continuous",
    text: "Время Present Continuous указывает на действие или процесс, длящийся в момент речи или в текущий период времени в настоящем.",
    imageUrl: "./grammar-image-document.png",
  },
  {
    id: crypto.randomUUID(),
    title: "Past Continuous",
    slug: "past-continuous",
    link: "/profile/grammar/past-continuous",
    text: "Время Past Continuous указывает на процесс, длившийся в определенный момент или период в прошлом.",
    imageUrl: "./grammar-image-document.png",
  },
  {
    id: crypto.randomUUID(),
    title: "Future Continuous",
    slug: "future-continuous",
    link: "/profile/grammar/future-continuous",
    text: "Время Future Continuous указывает на процесс, который будет длиться в определенный момент в будущем.",
    imageUrl: "./grammar-image-document.png",
  },
  {
    id: crypto.randomUUID(),
    title: "Present Perfect",
    slug: "present-perfect",
    link: "/profile/grammar/present-perfect",
    text: "Время Present Perfect обозначает действие, которое завершилось к настоящему моменту.",
    imageUrl: "./grammar-image-document.png",
  },
  {
    id: crypto.randomUUID(),
    title: "Past Perfect",
    slug: "past-perfect",
    link: "/profile/grammar/past-perfect",
    text: "Время Past Perfect обозначает действие, которое завершилось до определенного момента в прошлом.",
    imageUrl: "./grammar-image-document.png",
  },
  {
    id: crypto.randomUUID(),
    title: "Future Perfect",
    slug: "future-perfect",
    link: "/profile/grammar/future-perfect",
    text: "Время Future Perfect обозначает действие, которое закончится до определенного момента в будущем.",
    imageUrl: "./grammar-image-document.png",
  },
  {
    id: crypto.randomUUID(),
    title: "Present Perfect Continuous",
    slug: "present-perfect-continuous",
    link: "/profile/grammar/present-perfect-continuous",
    text: "Времена Perfect Continuous используются для обозначения процесса, который начался и длился до момента в настоящем, прошлом или будущем.",
    imageUrl: "./grammar-image-document.png",
  },
  {
    id: crypto.randomUUID(),
    title: "Past Perfect Continuous",
    slug: "past-perfect-continuous",
    link: "/profile/grammar/past-perfect-continuous",
    text: "Время Past Perfect Continuous указывает на действие, которое началось в прошлом и длилось до определённого момента.",
    imageUrl: "./grammar-image-document.png",
  },
  {
    id: crypto.randomUUID(),
    title: "Future Perfect Continuous",
    slug: "future-perfect-continuous",
    link: "/profile/grammar/future-perfect-continuous",
    text: "Время Future Perfect Continuous указывает на действие, которое будет длиться до определённого момента в будущем.",
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
