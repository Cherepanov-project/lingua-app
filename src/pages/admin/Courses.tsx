import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import {
  useGetCoursesQuery,
  useDeleteCourseMutation,
} from "../../shared/api/languagesApi";
import { useState, useMemo } from "react";
import type { Course } from "../../shared/types/course";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, InputBase, Button, Popover, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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
  const { data: courses = [], isLoading } = useGetCoursesQuery({});
  const [deleteCourse] = useDeleteCourseMutation();
  const [searchQuery, setSearchQuery] = useState("");

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleStatusClick = (
    event: React.MouseEvent<HTMLElement>,
    course: Course
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedCourse(course);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedCourse(null);
  };

  const filteredCourses = useMemo(() => {
    const searchLower = searchQuery.toLowerCase();
    return courses.filter(
      (course: Course) =>
        course.language.toLowerCase().includes(searchLower) ||
        course.level.toLowerCase().includes(searchLower) ||
        (course.published ? "опубликован" : "черновик").includes(searchLower)
    );
  }, [courses, searchQuery]);

  const columns: GridColDef<Course>[] = [
    {
      field: "language",
      headerName: "Название",
      flex: 1,
      renderCell: (params) => {
        const language = params.row.language;
        const level = params.row.level;
        return `${language} – ${level}`;
      },
    },

    {
      field: "modules",
      headerName: "Уроков",
      flex: 1,
      renderCell: (params) => {
        const modules = params.row.modules;
        return Array.isArray(modules) ? modules.length : 0;
      },
    },
    {
      field: "published",
      headerName: "Статус",
      flex: 1,
      renderCell: (params: GridRenderCellParams<Course>) => {
        if (!params.row) return null;

        const isPublished = Boolean(params.row.published);
        return (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Chip
              label={isPublished ? "Опубликован" : "Черновик"}
              size="small"
              sx={{
                backgroundColor: "#eff2ff",
                color: isPublished ? "#2e7d32" : "#9e9e9e",
                "& .MuiChip-label": {
                  padding: "3px 17px",
                },
                borderRadius: "5px",
              }}
            />
            <Button
              size="small"
              onClick={(e) => handleStatusClick(e, params.row)}
            >
              <svg
                width="16"
                height="4"
                viewBox="0 0 16 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C12 1.46957 12.2107 0.96086 12.5858 0.585787C12.9609 0.210714 13.4696 0 14 0C14.5304 0 15.0391 0.210714 15.4142 0.585787C15.7893 0.96086 16 1.46957 16 2C16 2.53043 15.7893 3.03914 15.4142 3.41421C15.0391 3.78929 14.5304 4 14 4C13.4696 4 12.9609 3.78929 12.5858 3.41421C12.2107 3.03914 12 2.53043 12 2ZM6 2C6 1.46957 6.21071 0.96086 6.58579 0.585787C6.96086 0.210714 7.46957 0 8 0C8.53043 0 9.03914 0.210714 9.41421 0.585787C9.78929 0.96086 10 1.46957 10 2C10 2.53043 9.78929 3.03914 9.41421 3.41421C9.03914 3.78929 8.53043 4 8 4C7.46957 4 6.96086 3.78929 6.58579 3.41421C6.21071 3.03914 6 2.53043 6 2ZM0 2C0 1.46957 0.210714 0.96086 0.585786 0.585787C0.960859 0.210714 1.46957 0 2 0C2.53043 0 3.03914 0.210714 3.41421 0.585787C3.78929 0.96086 4 1.46957 4 2C4 2.53043 3.78929 3.03914 3.41421 3.41421C3.03914 3.78929 2.53043 4 2 4C1.46957 4 0.960859 3.78929 0.585786 3.41421C0.210714 3.03914 0 2.53043 0 2ZM2 1C1.73478 1 1.48043 1.10536 1.29289 1.29289C1.10536 1.48043 1 1.73478 1 2C1 2.26522 1.10536 2.51957 1.29289 2.70711C1.48043 2.89464 1.73478 3 2 3C2.26522 3 2.51957 2.89464 2.70711 2.70711C2.89464 2.51957 3 2.26522 3 2C3 1.73478 2.89464 1.48043 2.70711 1.29289C2.51957 1.10536 2.26522 1 2 1ZM8 1C7.73478 1 7.48043 1.10536 7.29289 1.29289C7.10536 1.48043 7 1.73478 7 2C7 2.26522 7.10536 2.51957 7.29289 2.70711C7.48043 2.89464 7.73478 3 8 3C8.26522 3 8.51957 2.89464 8.70711 2.70711C8.89464 2.51957 9 2.26522 9 2C9 1.73478 8.89464 1.48043 8.70711 1.29289C8.51957 1.10536 8.26522 1 8 1ZM14 1C13.7348 1 13.4804 1.10536 13.2929 1.29289C13.1054 1.48043 13 1.73478 13 2C13 2.26522 13.1054 2.51957 13.2929 2.70711C13.4804 2.89464 13.7348 3 14 3C14.2652 3 14.5196 2.89464 14.7071 2.70711C14.8946 2.51957 15 2.26522 15 2C15 1.73478 14.8946 1.48043 14.7071 1.29289C14.5196 1.10536 14.2652 1 14 1Z"
                  fill="#757575"
                />
              </svg>
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ padding: "37px 58px" }}>
      <h1>Курсы</h1>

      <Box
        sx={{
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          width: "100%",
        }}
      >
        <Search sx={{ display: "flex", alignItems: "center", flex: 1 }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Поиск…"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Search>

        <Button component={Link} to={`/course/create`}>
          <AddIcon />
          Добавить курс
        </Button>
      </Box>
      <DataGrid
        rows={filteredCourses}
        columns={columns}
        getRowId={(row) => row.id}
        loading={isLoading}
        sx={{
          border: "none",
          borderRadius: "10px",
          backgroundColor: "#FFFFFF",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#FFFFFF",
          },
          "& .MuiDataGrid-cell": {
            textAlign: "center",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            "& .MuiDataGrid-columnHeaderTitleContainer": {
              justifyContent: "center",
              width: "100%",
            },
          },
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
        }}
      />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "5px",
          }}
        >
          <Button
            size="small"
            fullWidth
            component={Link}
            to={`/course/${selectedCourse?.id}`}
            variant="outlined"
            sx={{
              textDecoration: "none",
              textTransform: "capitalize",
              color: "black",
              borderRadius: "0",
            }}
          >
            Изменить
          </Button>
          <Button
            fullWidth
            size="small"
            sx={{
              textDecoration: "none",
              textTransform: "capitalize",
              color: "red",
              borderRadius: "0",
            }}
            onClick={() => {
              if (selectedCourse) deleteCourse(selectedCourse.id);
              handlePopoverClose();
            }}
          >
            Удалить
          </Button>
        </Box>
      </Popover>
    </Box>
  );
}
