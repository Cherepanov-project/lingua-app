import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Popover from "@mui/material/Popover";
import {
  useGetCoursesQuery,
  useDeleteCourseMutation,
} from "../../shared/api/languagesApi";
import { useState } from "react";
import type { Course } from "../../shared/types/course";
import "../../shared/styles/Courses.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

export default function Courses() {
  const { data: courses = [], isLoading } = useGetCoursesQuery({});

  const [deleteCourse] = useDeleteCourseMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [popoverState, setPopoverState] = useState<{
    anchorEl: HTMLButtonElement | null;
    courseId: string | null;
  }>({ anchorEl: null, courseId: null });

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    courseId: string
  ) => {
    setPopoverState({ anchorEl: event.currentTarget, courseId });
  };

  const handleClose = () => {
    setPopoverState({ anchorEl: null, courseId: null });
  };

  const filteredCourses = courses.filter((course: Course) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      course.language.toLowerCase().includes(searchLower) ||
      course.level.toLowerCase().includes(searchLower) ||
      (course.published ? "опубликован" : "черновик").includes(searchLower)
    );
  });

  return (
    <div className="coursesPage">
      {" "}
      <h1>Курсы</h1>
      <div className="wrapper">
        {" "}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Search>
        <Link to="/course/create">Добавить курс</Link>
      </div>
      <ul className="coursesList">
        <li className="titles">
          <div className="title">Название</div>
          <div className="title">Уроков</div>
          <div className="title">Статус</div>
        </li>
        {isLoading ? (
          <>Загрузка...</>
        ) : (
          filteredCourses.map((course: Course) => (
            <li key={course.id} className="languages">
              <div className="courseItem">
                {course.language} – {course.level}
              </div>
              <div className="courseItem">{course.modules.length}</div>
              <button
                className="courseItem"
                onClick={(e) => handleClick(e, String(course.id))}
                aria-describedby={
                  popoverState.courseId === String(course.id)
                    ? "simple-popover"
                    : undefined
                }
              >
                {course.published ? "Опубликован" : "Черновик"}
              </button>
              <Popover
                id="simple-popover"
                open={
                  popoverState.courseId === String(course.id) &&
                  Boolean(popoverState.anchorEl)
                }
                anchorEl={popoverState.anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <div className="courseOptions">
                  <button className="courseEdit">
                    <Link to={`/course/${course.id}`}>Изменить</Link>
                  </button>
                  <button onClick={() => deleteCourse(String(course.id))}>
                    Удалить
                  </button>
                </div>
              </Popover>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
