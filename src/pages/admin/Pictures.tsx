import React, { useState, useMemo } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useGetPicturesQuery, useAddPictureMutation } from "../../shared/api/picturesApi";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const Pictures = () => {
  const { data: pictures = [] } = useGetPicturesQuery();
  const [addPicture] = useAddPictureMutation();
  const [open, setOpen] = useState(false);
  const [newPicture, setNewPicture] = useState({
    title: '',
    tag: '',
    img: ''
  });

  // Добавляем состояние для фильтра по тегу
  const [filterTag, setFilterTag] = useState('all');

  // Собираем уникальные теги из pictures
  const tags = useMemo(() => {
    const uniqueTags = new Set(pictures.map(p => p.tag));
    return ['all', ...Array.from(uniqueTags)];
  }, [pictures]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewPicture({ title: '', tag: '', img: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPicture(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addPicture(newPicture).unwrap();
      handleClose();
    } catch (err) {
      console.error('Failed to add picture:', err);
    }
  };

  // Фильтруем картинки по выбранному тегу
  const filteredPictures = filterTag === 'all'
    ? pictures
    : pictures.filter(p => p.tag === filterTag);

  return (
    <Box sx={{ p: 3, height: 'calc(100% - 64px)', // Учитываем высоту header
      overflow: 'auto'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="filter-tag-label">Фильтр по тегу</InputLabel>
          <Select
            labelId="filter-tag-label"
            value={filterTag}
            label="Фильтр по тегу"
            onChange={(e) => setFilterTag(e.target.value)}
          >
            {tags.map(tag => (
              <MenuItem key={tag} value={tag}>
                {tag === 'all' ? 'Все' : tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleOpen}>
          Добавить картинку
        </Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            Добавить новую картинку
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                required
                label="Название"
                name="title"
                value={newPicture.title}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                required
                label="Тег"
                name="tag"
                value={newPicture.tag}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                required
                label="Ссылка на картинку"
                name="img"
                value={newPicture.img}
                onChange={handleChange}
                fullWidth
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button onClick={handleClose}>Отмена</Button>
                <Button type="submit" variant="contained">Добавить</Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Modal>

      <Box display="flex" justifyContent="center" alignItems="center" sx={{ 
        flex: 1,
        overflow: 'hidden',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <ImageList
          sx={{
            width: '100%',
            height: '100%',
            margin: 0,
            overflowY: 'auto',
            flex: 1
          }}
          cols={3}
        >
          {filteredPictures.map((item) => (
            <ImageListItem key={item.id}>
              <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={<span>TAG: {item.tag}</span>}
                position="below"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
};

export default Pictures;
