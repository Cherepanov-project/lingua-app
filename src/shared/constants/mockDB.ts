export const mockLanguages = [
  {
    label: "Английский",
    code: "en",
    emoji: "🇬🇧",
  },
  {
    label: "Русский",
    code: "ru",
    emoji: "🇷🇺",
  },
  {
    label: "Французский",
    code: "fr",
    emoji: "🇫🇷",
  },
  {
    label: "Немецкий",
    code: "de",
    emoji: "🇩🇪",
  },
  {
    label: "Турецкий",
    code: "tr",
    emoji: "🇹🇷",
  },
  {
    label: "Испанский",
    code: "es",
    emoji: "🇪🇸",
  },
  {
    label: "Итальянский",
    code: "it",
    emoji: "🇮🇹",
  },
  {
    label: "Португальский",
    code: "pt",
    emoji: "🇵🇹",
  },
  {
    label: "Китайский",
    code: "zh",
    emoji: "🇨🇳",
  },
  {
    label: "Японский",
    code: "ja",
    emoji: "🇯🇵",
  },
  {
    label: "Корейский",
    code: "ko",
    emoji: "🇰🇷",
  },
  {
    label: "Иврит",
    code: "he",
    emoji: "🇮🇱",
  },
  {
    label: "Арабский",
    code: "ar",
    emoji: "🇸🇦",
  },
];

export const mockLevels = [
  {
    id: "1",
    label: "A1",
  },
  {
    id: "2",
    label: "A2",
  },
  {
    id: "3",
    label: "B1",
  },
  {
    id: "4",
    label: "B2",
  },
  {
    id: "5",
    label: "C1",
  },
];

export const mockCourses = [
  {
    id: "c26a",
    language: "Английский",
    level: "A1",
    modules: ["39da"],
    published: false,
  },
  {
    id: "5e2f",
    language: "Английский",
    level: "A2",
    modules: [],
    published: false,
  },
];

export const mockModules = [
  {
    id: "39da",
    name: "Starter Guide",
    lessons: ["1abd"],
  },
];

export const mockLessons = [
  {
    id: "1abd",
    name: "Alphabet",
    exercises: ["blahblah"],
  },
];
