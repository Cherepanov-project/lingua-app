import { Box, Button, Input, Modal, Typography } from "@mui/material";
import { stylesObj } from "../../user/stylesObj";
import {
  AddNewGame,
  GamesTitle,
  MatchGameTitle,
} from "../../shared/constants/textConsts";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useGetMatchGamesQuery } from "../../shared/api/matchGameApi";
import MatchGameModal from "./MatchGameModal";

const Games = () => {
  const { data: gamesList = [], isLoading } = useGetMatchGamesQuery();
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const handleOpen = (
    setFunc: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setFunc(true);
  };
  const handleClose = (
    setFunc: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setFunc(false);
  };
  if (!isLoading) {
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
            onClick={() => handleOpen(setOpen)}
          >
            {AddNewGame}
          </Button>
        </Box>
        <Modal open={open} onClose={() => handleClose(setOpen)}>
          <Box sx={{ ...stylesObj.gamesModal }}>
            <Box>
              <Typography variant="h6" component="h2">
                {AddNewGame}
              </Typography>
              <Button
                sx={{ ...stylesObj.adminButton, mt: "18px", width: "100%" }}
                variant="contained"
                onClick={() => {
                  handleClose(setOpen);
                  handleOpen(setOpenCreate);
                }}
              >
                {MatchGameTitle}
              </Button>
            </Box>
            <Box>
              <Button onClick={() => handleClose(setOpen)}>Отмена</Button>
            </Box>
          </Box>
        </Modal>
        <MatchGameModal
          open={openCreate}
          handleClose={() => handleClose(setOpenCreate)}
          length={gamesList.length}
        />
        <Box>
          {...gamesList.map((game) => {
            return (
              <Box key={game.level}>
                <Typography sx={{ fontWeight: "500", fontSize: "28px" }}>
                  {MatchGameTitle}
                </Typography>
                <Box>
                  {...game.pairs.map((pair) => {
                    return (
                      <Box sx={{ display: "flex" }}>
                        <Input
                          readOnly
                          name="russian"
                          defaultValue={pair.russian}
                        />
                        <Input
                          readOnly
                          name="english"
                          defaultValue={pair.english}
                        />
                      </Box>
                    );
                  })}
                  <Button>Редактировать</Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }
};

export default Games;
