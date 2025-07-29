import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";

export const statsConfig = [
  {
    id: "avatars",
    type: "avatars",
    avatars: ["#F1B31C", "#ED2939", "#7E94F9"],
    title: "10k+",
    subtitle: "Отзывы пользователей",
    height: 100,
    minWidth: 120,
    maxWidth: 140,
  },
  {
    id: "users",
    type: "icon",
    icon: PersonIcon,
    bgColor: "#F1B31C",
    title: "100M+",
    subtitle: "Количество зарегистрированных пользователей",
    height: 140,
    minWidth: 180,
    maxWidth: 220,
  },
  {
    id: "students",
    type: "icon",
    icon: EditIcon,
    bgColor: "#7E94F9",
    title: "100k+",
    subtitle: "Количество зарегистрированных студентов",
    height: 140,
    minWidth: 180,
    maxWidth: 220,
  },
  {
    id: "rating",
    type: "stars",
    title: "4.5",
    subtitle: "Наш рейтинг",
    height: 100,
    minWidth: 140,
    maxWidth: 180,
  },
];
