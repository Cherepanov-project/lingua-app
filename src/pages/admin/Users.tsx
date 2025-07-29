import { Typography, Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useGetUsersQuery } from "../../shared/api/usersApi";
import UserIcon from "../../assets/VectorIcon.svg";

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const Users = () => {
  const { data: users = [] } = useGetUsersQuery();
  console.log(users);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<null | number>(null);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedRow(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  interface User {
    id: number;
    name: string;
    email: string;
    activeCourses: number;
    language: string;
    registrationDate: string;
  }

  const columns: GridColDef<User>[] = [
    {
      field: "name",
      headerName: "Имя",
      flex: 1,
      headerClassName: "header-font", // Применяем класс к заголовку
      cellClassName: "name-cell", // Применяем класс к ячейкам
      sortable: false,
      headerAlign: "left", // Заголовок слева
      align: "left", // Содержимое слева
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "19px",
            width: "100%",
            paddingLeft: "5px",
          }}
        >
          <img src={UserIcon} alt="User" />
          {params.value}
        </Box>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerClassName: "header-font",
      cellClassName: "regular-cell",
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "activeCourses",
      headerName: "Активные Курсы",
      flex: 1,
      headerClassName: "header-font",
      cellClassName: "regular-cell",
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "registrationDate",
      headerName: "Дата регистрации",
      flex: 1,
      headerClassName: "header-font",
      cellClassName: "regular-cell",
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "",
      width: 60,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="menu"
            onClick={(e) => handleMenuClick(e, params.row.id)}
            sx={{
              padding: "8px",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={selectedRow === params.row.id && Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Изменить</MenuItem>
            <MenuItem onClick={handleMenuClose}>Деактивировать</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <Box>
      <Typography
        sx={{
          fontSize: "40px",
          fontWeight: 600,
          lineHeight: "70px",
          p: "37px 58px",
        }}
      >
        Пользователи
      </Typography>

      <Box sx={{ p: "32px 58px" }}>
        <DataGrid
          rows={users}
          columns={columns}
          disableColumnMenu
          disableColumnFilter
          disableColumnResize
          disableColumnSelector
          disableRowSelectionOnClick
          hideFooter
          rowHeight={100}
          sx={{
            border: "none",
            fontFamily: "'Roboto', sans-serif",
            // padding: '30px 30',

            // Стили для заголовков колонок
            "& .header-font": {
              fontSize: "24px",
              fontWeight: 600,
              color: "rgb(135, 135, 135);",
            },

            // Стили для ячеек с именем
            "& .name-cell": {
              fontSize: "24px",
              fontWeight: 500,
            },

            // Стили для остальных ячеек
            "& .regular-cell": {
              fontSize: "24px",
              fontWeight: 400,
              color: "rgb(117, 117, 117);",
            },

            // Границы
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
              borderRight: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "1px solid rgba(224, 224, 224, 0.8)",
              borderRight: "none",
            },
            "& .MuiDataGrid-row:last-child .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnSeparator": {
              // Убираем разделители колонок
              display: "none",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Users;
