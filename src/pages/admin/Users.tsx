import { Typography, Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useGetUsersQuery } from "../../shared/api/usersApi";
import UserIcon from "../../assets/VectorIcon.svg";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  activeCourses: number;
  language: string;
  registrationDate: string;
}

const Users = () => {
  const { data: apiUsers = [] } = useGetUsersQuery();
  
  // Преобразование данных из API
  const users: User[] = apiUsers.map(user => ({
    ...user,
    id: Number(user.id),
    activeCourses: Number(user.activeCourses) || 0,
    registrationDate: formatDate(user.registrationDate)
  }));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<null | number>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedRow(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  // Форматирование даты
  function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  }

  const columns: GridColDef<User>[] = [
    {
      field: "name",
      headerName: "Имя",
      flex: 1,
      headerClassName: "header-font",
      cellClassName: "name-cell",
      sortable: false,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => (
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "19px", 
          width: "100%", 
          paddingLeft: "5px" 
        }}>
          <img src={UserIcon} alt="User" width={24} height={24} />
          <Typography variant="body1">{params.value}</Typography>
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
      renderCell: (params) => (
        <Typography variant="body1">{params.value}</Typography>
      ),
    },
    {
      field: "activeCourses",
      headerName: "Активные курсы",
      flex: 1,
      headerClassName: "header-font",
      cellClassName: "regular-cell",
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography variant="body1">{params.value}</Typography>
      ),
    },
    {
      field: "language",
      headerName: "Язык",
      flex: 1,
      headerClassName: "header-font",
      cellClassName: "regular-cell",
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography variant="body1">{params.value}</Typography>
      ),
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
      renderCell: (params) => (
        <Typography variant="body1">{params.value}</Typography>
      ),
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
                backgroundColor: "rgba(0, 0, 0, 0.04)" 
              } 
            }}
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={selectedRow === params.row.id && Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleMenuClose}>Изменить</MenuItem>
            <MenuItem onClick={handleMenuClose}>Деактивировать</MenuItem>
            <MenuItem onClick={handleMenuClose}>Удалить</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#FCFDFD', minHeight: '100vh' }}>
      <Typography 
        sx={{ 
          fontSize: "40px", 
          fontWeight: 600, 
          lineHeight: "70px", 
          p: "37px 58px",
          color: '#333333'
        }}
      >
        Пользователи
      </Typography>

      <Box sx={{ p: "32px 58px", backgroundColor: 'white', borderRadius: '8px', boxShadow: 3 }}>
        <DataGrid
          rows={users}
          columns={columns}
          disableColumnMenu
          disableColumnFilter
          disableColumnResize
          disableColumnSelector
          disableRowSelectionOnClick
          hideFooter
          rowHeight={80}
          sx={{
            border: "none",
            fontFamily: "'Roboto', sans-serif",
            '& .MuiDataGrid-virtualScroller': {
              overflowX: 'hidden',
            },
            "& .header-font": {
              fontSize: "20px",
              fontWeight: 600,
              color: "rgb(135, 135, 135)",
            },
            "& .name-cell": {
              fontSize: "18px",
              fontWeight: 500,
              color: '#333333',
            },
            "& .regular-cell": {
              fontSize: "16px",
              fontWeight: 400,
              color: "rgb(117, 117, 117)",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
              borderRight: "none",
              py: 2,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "1px solid rgba(224, 224, 224, 0.8)",
              borderRight: "none",
              backgroundColor: '#f9f9f9',
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
            },
            "& .MuiDataGrid-row:last-child .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnSeparator": {
              display: "none",
            },
          }}
          getRowId={(row) => row.id}
        />
      </Box>
    </Box>
  );
};

export default Users;