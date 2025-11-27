import type { Course } from "../../../../shared/types/course";
import { useGetCoursesQuery } from "../../../../shared/api/languagesApi";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { Box, Button, InputBase, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { CoursesCard } from "./CourseCard";
import CoursesModal from "./CoursesAddModal";
import { stylesObj } from "../../../../user/stylesObj";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
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
  const { data: courses = [] } = useGetCoursesQuery({});
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const filteredCourses = useMemo(() => {
    const searchLower = searchQuery.toLowerCase();
    return courses.filter(
      (course: Course) =>
        course.language.toLowerCase().includes(searchLower) ||
        course.level.toLowerCase().includes(searchLower)
    );
  }, [courses, searchQuery]);

  return (
    <>
      <Box
        sx={{
          maxWidth: "1700px",
          display: "flex",
          justifyContent: "space-between",
          margin: "40px auto 40px",
          padding: "0 20px",
        }}
      >
        <CoursesModal open={open} onClose={() => setOpen(false)}></CoursesModal>
        <Search
          sx={{
            display: "flex",
            alignItems: "center",
            maxWidth: "700px",
            border: "2px solid #020202ff",
            borderRadius: "10px",
          }}
        >
          <SearchIconWrapper>
            <SearchIcon sx={{ color: "#878787" }} />
          </SearchIconWrapper>
          <StyledInputBase
            id="course-search"
            name="course-search"
            placeholder="Поиск курсов…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Search>
        <Button
          onClick={() => setOpen(true)}
          sx={{
            ...stylesObj.courseButton,
          }}
        >
          Добавить курс
        </Button>
      </Box>

      <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
        <Typography variant="h4">Курсы</Typography>
      </Box>
      <Box sx={{ overflowY: "auto", height: "calc(100vh - 300px)" }}>
        <Stack
          direction="row"
          useFlexGap
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "32px",
            padding: "20px",
            maxWidth: "2000px",
            margin: "0 auto",
          }}
        >
          {filteredCourses.length < 1 && (
            <Typography variant="h6">Ничего не найдено!</Typography>
          )}
          {filteredCourses?.map((item: Course) => (
            <CoursesCard key={item.id} item={item} />
          ))}
        </Stack>
      </Box>
    </>
  );
}
