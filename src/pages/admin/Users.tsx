import { Typography, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useGetUsersQuery, type Auth0User } from "../../shared/api/usersApi";
import UserIcon from "../../assets/VectorIcon.svg";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState } from "react";

const Users = () => {
  const { data: users = [], isLoading } = useGetUsersQuery();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<null | string>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedRow(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const columns: GridColDef<Auth0User>[] = [
    {
      field: "name",
      headerName: "Имя",
      flex: 1.5,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src={params.row.picture || UserIcon}
            alt="User"
            height="40"
            width="40"
            style={{ borderRadius: '50%', display: 'block' }}
          />
          <Typography variant="body2" sx={{ fontWeight: 700, color: '#2D3748' }}>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
    },
    {
      field: "logins_count",
      headerName: "Кол-во входов",
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: "created_at",
      headerName: "Дата регистрации",
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "actions",
      headerName: "",
      width: 60,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      align: "center",
      renderCell: (params) => (
        <>
          <IconButton aria-label="menu" onClick={(e) => handleMenuClick(e, params.row.user_id)}>
            <MoreHorizIcon fontSize="small" />
          </IconButton>
          <Menu anchorEl={anchorEl} open={selectedRow === params.row.user_id && Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Изменить</MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{ color: 'red' }}>Деактивировать</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <Box>
      <Typography sx={{ fontSize: "24px", fontWeight: 700, p: "32px 58px" }}>
        Пользователи
      </Typography>

      <Box sx={{ p: "0 58px 32px 58px" }}>
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row.user_id}
          loading={isLoading}
          disableColumnMenu
          disableRowSelectionOnClick
          hideFooter
          rowHeight={70}
          sx={{
            backgroundColor: '#FFFFFF',
            border: 'none',
            '& .MuiDataGrid-columnSeparator': {
              display: 'none',
            },
            // границы
            '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
              borderBottom: '1px solid #F0F0F0',
            },
            // заголовки
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#FFFFFF !important',
              display: 'flex',
              alignItems: 'center',
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 600,
                fontSize: '12px',
                color: '#000000 !important',
                textTransform: 'uppercase',
              }
            },
            '& .MuiDataGrid-cell': {
              display: 'flex',
              alignItems: 'center',
              color: '#2D3748',
              fontWeight: 500,
              fontSize: '14px',
              '&:focus, &:focus-within': {
                outline: 'none !important',
              },
            },
            '& .MuiDataGrid-virtualScrollerRenderZone > .MuiDataGrid-row:last-of-type': {
              '& .MuiDataGrid-cell': {
                borderBottom: 'none',
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Users;