import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { stylesObj } from "../../user/stylesObj";
import {
  AddNewGame,
  GamesTitle,
  MatchGameTitle,
} from "../../shared/constants/textConsts";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import {
  gameLevels,
  type GameLevel,
} from "../../shared/constants/mockMatchGame";

const Games = () => {
  const [gamesList, setGamesList] = useState(gameLevels);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e: React.FormEvent, newGame: GameLevel) => {
    e.preventDefault();
    console.log(newGame);
    console.log(e);
    if (gamesList.find((game) => game.level === newGame.level)) {
      setGamesList((prev) => {
        const newList = prev.filter((game) => game.level !== newGame.level);
        return [...newList, newGame];
      });
    }
  };
  return (
    <Box sx={{ p: "32px 40px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ ...stylesObj.adminPageTitle }}>
          {GamesTitle}
        </Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          sx={{ ...stylesObj.adminButton }}
          onClick={handleOpen}
        >
          {AddNewGame}
        </Button>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            backgroundColor: "#fff",
            position: "absolute",
            top: "40%",
            left: "45%",
            p: "24px",
            borderRadius: "5px",
            width: "320px",
            height: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6" component="h2">
              {AddNewGame}
            </Typography>
            <Button
              sx={{ ...stylesObj.adminButton, mt: "18px", width: "100%" }}
              variant="contained"
            >
              {MatchGameTitle}
            </Button>
          </Box>
          <Box>
            <Button onClick={handleClose}>Отмена</Button>
          </Box>
        </Box>
      </Modal>
      <Box>
        {...gamesList.map((game) => {
          return (
            <Box key={game.level}>
              <Typography sx={{ fontWeight: "500", fontSize: "28px" }}>
                {MatchGameTitle}
              </Typography>
              <form onSubmit={(e) => handleSubmit(e, game)}>
                {...game.pairs.map((pair) => {
                  return (
                    <Box sx={{ display: "flex" }}>
                      <TextField name="russian" value={pair.russian} />
                      <TextField name="english" value={pair.english} />
                    </Box>
                  );
                })}
                <Button type="submit">Сохранить изменения</Button>
              </form>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Games;
