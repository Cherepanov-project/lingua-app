import { Typography, Box, IconButton, Menu, MenuItem, Button, Modal, TextField, Stack, InputBase } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation, type Auth0User } from "../../shared/api/usersApi";
import UserIcon from "../../assets/VectorIcon.svg";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import { useState, useMemo, type SetStateAction } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#FFF',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

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

const Users = () => {
  const { data: users = [], isLoading } = useGetUsersQuery();
  const [addUser, { isLoading: isAdding }] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<null | string>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', name: '', password: '' });
  const [searchQuery, setSearchQuery] = useState(""); // Состояние для поискового запроса

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedRow(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleDelete = async (userId: string) => {
    handleMenuClose();
    if (window.confirm('Удалить этого пользователя?')) {
      try {
        await deleteUser(userId).unwrap();
      } catch (err) {
        console.error('Ошибка удаления пользователя:', err);
        alert('Не удалось удалить пользователя.');
      }
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewUser({ email: '', name: '', password: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addUser(newUser).unwrap();
      handleCloseModal();
    } catch (err) {
      console.error('Ошибка добавления пользователя:', err);
      alert('Не удалось добавить пользователя.');
    }
  };

  // Логика фильтрации пользователей
  const filteredUsers = useMemo(() => {
    const searchLower = searchQuery.toLowerCase();
    return users.filter(
      (user: Auth0User) =>
        user.email.toLowerCase().includes(searchLower) ||
        user.name.toLowerCase().includes(searchLower)
    );
  }, [users, searchQuery]);

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
      flex: 1.5
    },
    {
      field: "logins_count",
      headerName: "Кол-во входов",
      flex: 1, align: 'center',
      headerAlign: 'center'
    },
    {
      field: "created_at",
      headerName: "Дата регистрации",
      flex: 1, align: 'center',
      headerAlign: 'center',
      renderCell: (params) => new Date(params.value).toLocaleDateString()
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
            <MenuItem onClick={() => handleDelete(params.row.user_id)} sx={{ color: 'red' }}>Удалить</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: "37px 58px" }}>
        <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>
          Пользователи
        </Typography>

        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenModal} sx={{ textTransform: 'none' }}>
          Добавить пользователя
        </Button>
      </Box>

      <Search
        sx={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          border: "#878787 solid 1px",
          borderRadius: "10px",
          mx: 4,
          maxWidth: '400px',
          marginLeft: '58px'
        }}
      >
        <SearchIconWrapper>
          <SearchIcon sx={{ color: "#878787" }} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Поиск пользователей…"
          inputProps={{ "aria-label": "search" }}
          value={searchQuery}
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearchQuery(e.target.value)}
        />
      </Search>

      <Box sx={{ p: "0 58px 32px 58px" }}>
        <DataGrid
          rows={filteredUsers}
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
            '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
              borderBottom: '1px solid #F0F0F0',
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#FFFFFF !important',
              display: 'flex',
              alignItems: 'center',
              '& .MuiDataGrid-columnHeaderTitleContainer': {
                justifyContent: 'center',
                width: '100%',
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontWeight: 600,
                  fontSize: '12px',
                  color: '#000000 !important',
                  textTransform: 'uppercase',
                }
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

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" mb={2}>Новый пользователь</Typography>
          <form onSubmit={handleAddUser}>
            <Stack spacing={2}>
              <TextField required label="Имя" name="name" value={newUser.name} onChange={handleInputChange} fullWidth />
              <TextField required type="email" label="Email" name="email" value={newUser.email} onChange={handleInputChange} fullWidth />
              <TextField required type="password" label="Пароль" name="password" value={newUser.password} onChange={handleInputChange} fullWidth />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                <Button onClick={handleCloseModal}>Отмена</Button>
                <Button type="submit" variant="contained" disabled={isAdding}>
                  {isAdding ? 'Создание...' : 'Создать'}
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Modal>

    </Box>
  );
};

export default Users;