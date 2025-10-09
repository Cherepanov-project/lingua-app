import { Box, Button, Input, Modal, Typography } from "@mui/material";
import { stylesObj } from "../../user/stylesObj";
import {
  AddNewGame,
  CancelTitle,
  DeleteTitle,
  EditTitle,
  GamesTitle,
  MatchGameTitle,
} from "../../shared/constants/textConsts";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import {
  useDeleteMatchGameMutation,
  useGetMatchGamesQuery,
  type MatchGame,
} from "../../shared/api/matchGameApi";
import MatchGameModal from "./MatchGameModal";

const Games = () => {
  const { data: gamesList = [], isLoading } = useGetMatchGamesQuery();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"add" | "edit">("add");
  const [currentGame, setCurrentGame] = useState<MatchGame | undefined>(
    undefined
  );
  const [deleteId, setDeleteId] = useState(0);
  const [deleteMatchGame] = useDeleteMatchGameMutation();
  const [openDelete, setOpenDelete] = useState(false);
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
  const handleDelete = async () => {
    await deleteMatchGame(deleteId).unwrap();
    setDeleteId(0);
    handleClose(setOpenDelete);
  };
  const handleEdit = (game: MatchGame) => {
    setCurrentGame(game);
    setType("edit");
    handleOpen(setOpenCreate);
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
                  setType("add");
                  handleOpen(setOpenCreate);
                }}
              >
                {MatchGameTitle}
              </Button>
            </Box>
            <Box>
              <Button
                sx={{ color: "gray" }}
                onClick={() => handleClose(setOpen)}
              >
                {CancelTitle}
              </Button>
            </Box>
          </Box>
        </Modal>
        <MatchGameModal
          open={openCreate}
          handleClose={() => handleClose(setOpenCreate)}
          length={gamesList.length}
          currentGame={currentGame}
          setCurrentGame={setCurrentGame}
          type={type}
        />
        <Modal open={openDelete} onClose={() => handleClose(setOpenDelete)}>
          <Box sx={{ ...stylesObj.gamesModal, height: "150px" }}>
            <Typography variant="h6" component="h2">
              {DeleteTitle}?
            </Typography>
            <Box>
              <Button sx={{ color: "red" }} onClick={handleDelete}>
                {DeleteTitle}
              </Button>
              <Button
                sx={{ color: "gray" }}
                onClick={() => handleClose(setOpenDelete)}
              >
                {CancelTitle}
              </Button>
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
                <Box>
                  {...game.pairs.map((pair) => {
                    return (
                      <Box sx={{ display: "flex" }}>
                        <Input readOnly name="left" value={pair.left} />
                        <Input readOnly name="right" value={pair.right} />
                      </Box>
                    );
                  })}
                  <Button onClick={() => handleEdit(game)} sx={{ mr: "4px" }}>
                    {EditTitle}
                  </Button>
                  <Button
                    sx={{ color: "red" }}
                    onClick={() => {
                      handleOpen(setOpenDelete);
                      setDeleteId(game.id);
                    }}
                  >
                    {DeleteTitle}
                  </Button>
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
