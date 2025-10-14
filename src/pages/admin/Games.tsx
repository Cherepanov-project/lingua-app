import {
  Box,
  Button,
  Fab,
  Input,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { stylesObj } from "../../user/stylesObj";
import {
  AddNewGame,
  CancelTitle,
  DeleteTitle,
  EditTitle,
  GamesTitle,
  LieTitle,
  MatchGameTitle,
  TruthOrLieGameTitle,
  TruthTitle,
} from "../../shared/constants/textConsts";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import {
  useDeleteMatchGameMutation,
  useGetMatchGamesQuery,
  type MatchGame,
} from "../../shared/api/matchGameApi";
import MatchGameModal from "./MatchGameModal";
import {
  useDeleteGameStatementMutation,
  useDeleteTruthOrLieGameMutation,
  useGetTruthOrLieGamesQuery,
  type GameStatement,
  type TruthOrLieGame,
} from "../../shared/api/truthOrLieGameApi";
import CloseIcon from "@mui/icons-material/Close";
import TruthOrLieModal from "./TruthOrLieModal";

const Games = () => {
  const { data: matchGamesList = [] } = useGetMatchGamesQuery();
  const { data: truthOrLieGamesList = [], isLoading } =
    useGetTruthOrLieGamesQuery();
  const [open, setOpen] = useState(false);
  const [gameStatement, setGameStatement] = useState<{
    statementId: number;
    gameId: number;
    prev: GameStatement[];
  }>({
    statementId: 0,
    gameId: 0,
    prev: [],
  });
  const [type, setType] = useState<"add" | "edit">("add");
  const [deleteType, setDeleteType] = useState("");
  const [currentMatchGame, setCurrentMatchGame] = useState<
    MatchGame | undefined
  >(undefined);
  const [currentTruthOrLieGame, setCurrentTruthOrLieGame] = useState<
    TruthOrLieGame | undefined
  >(undefined);
  const [deleteId, setDeleteId] = useState(0);
  const [deleteMatchGame] = useDeleteMatchGameMutation();
  const [deleteTruthOrLieGame] = useDeleteTruthOrLieGameMutation();
  const [deleteGameStatement] = useDeleteGameStatementMutation();
  const [openDelete, setOpenDelete] = useState(false);
  const [openCreateMatch, setOpenCreateMatch] = useState(false);
  const [openCreateTruthOrLie, setOpenCreateTruthOrLie] = useState(false);
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
    switch (deleteType) {
      case "match":
        await deleteMatchGame(deleteId).unwrap();
        break;
      case "truthOrLie":
        await deleteTruthOrLieGame(deleteId).unwrap();
        break;
      default:
        break;
    }
    setDeleteId(0);
    setDeleteType("");
    handleClose(setOpenDelete);
  };
  const handleDeleteStatement = async () => {
    const newStatements = [
      ...gameStatement.prev.filter(
        (_, index) => index !== gameStatement.statementId
      ),
    ];
    await deleteGameStatement({ gameId: gameStatement.gameId, newStatements });
    setGameStatement({ gameId: 0, statementId: 0, prev: [] });
    setDeleteType("");
    handleClose(setOpenDelete);
  };
  const handleEditMatch = (game: MatchGame) => {
    setCurrentMatchGame(game);
    setType("edit");
    handleOpen(setOpenCreateMatch);
  };
  const handleEditTruthOrLie = (game: TruthOrLieGame) => {
    setCurrentTruthOrLieGame(game);
    setType("edit");
    handleOpen(setOpenCreateTruthOrLie);
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
                  handleOpen(setOpenCreateMatch);
                }}
              >
                {MatchGameTitle}
              </Button>
              <Button
                sx={{ ...stylesObj.adminButton, mt: "18px", width: "100%" }}
                variant="contained"
                onClick={() => {
                  handleClose(setOpen);
                  setType("add");
                  handleOpen(setOpenCreateTruthOrLie);
                }}
              >
                {TruthOrLieGameTitle}
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
          open={openCreateMatch}
          handleClose={() => handleClose(setOpenCreateMatch)}
          length={matchGamesList.length}
          currentGame={currentMatchGame}
          setCurrentGame={setCurrentMatchGame}
          type={type}
        />
        <TruthOrLieModal
          open={openCreateTruthOrLie}
          handleClose={() => handleClose(setOpenCreateTruthOrLie)}
          length={truthOrLieGamesList.length}
          currentGame={currentTruthOrLieGame}
          setCurrentGame={setCurrentTruthOrLieGame}
          type={type}
        />
        <Modal open={openDelete} onClose={() => handleClose(setOpenDelete)}>
          <Box sx={{ ...stylesObj.gamesModal, height: "150px" }}>
            <Typography variant="h6" component="h2">
              {DeleteTitle}?
            </Typography>
            <Box>
              <Button
                sx={{ color: "red" }}
                onClick={
                  deleteType === "statement"
                    ? handleDeleteStatement
                    : handleDelete
                }
              >
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
        <Box
          sx={{
            overflow: "auto",
            maxHeight: "75vh",
            display: "flex",
            flexDirection: "column",
            gap: "56px",
            maxWidth: "750px",
            padding: "14px",
          }}
        >
          <Box>
            {...matchGamesList.map((matchGame) => {
              return (
                <Box key={matchGame.level}>
                  <Typography sx={{ ...stylesObj.gameTitle }}>
                    {MatchGameTitle}
                  </Typography>
                  <Box>
                    {...matchGame.pairs.map((pair) => {
                      return (
                        <Box sx={{ display: "flex" }}>
                          <Input readOnly name="left" value={pair.left} />
                          <Input readOnly name="right" value={pair.right} />
                        </Box>
                      );
                    })}
                    <Button
                      onClick={() => handleEditMatch(matchGame)}
                      sx={{ mr: "4px" }}
                    >
                      {EditTitle}
                    </Button>
                    <Button
                      sx={{ color: "red" }}
                      onClick={() => {
                        handleOpen(setOpenDelete);
                        setDeleteId(matchGame.id);
                        setDeleteType("match");
                      }}
                    >
                      {DeleteTitle}
                    </Button>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box>
            {...truthOrLieGamesList.map((truthOrLieGame) => {
              return (
                <Box key={truthOrLieGame.level}>
                  <Typography sx={{ ...stylesObj.gameTitle }}>
                    {TruthOrLieGameTitle}
                  </Typography>
                  <Box>
                    {...truthOrLieGame.statements.map((statement, index) => {
                      return (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography sx={{ fontSize: "18px" }}>
                            {statement.statement}
                          </Typography>
                          <Box sx={{ display: "flex", gap: "12px" }}>
                            <ToggleButtonGroup
                              exclusive
                              value={statement.correctValue}
                              sx={{
                                display: "flex",
                                gap: "8px",
                                alignItems: "center",
                              }}
                            >
                              <ToggleButton
                                sx={{ ...stylesObj.toggleButton }}
                                value="true"
                              >
                                {TruthTitle}
                              </ToggleButton>
                              <ToggleButton
                                sx={{ ...stylesObj.toggleButton }}
                                value="false"
                              >
                                {LieTitle}
                              </ToggleButton>
                            </ToggleButtonGroup>
                            <Fab
                              disableRipple
                              disableFocusRipple
                              disableTouchRipple
                              sx={{ boxShadow: "none", background: "none" }}
                              onClick={() => {
                                handleOpen(setOpenDelete);
                                setGameStatement({
                                  gameId: truthOrLieGame.id,
                                  statementId: index,
                                  prev: [...truthOrLieGame.statements],
                                });
                                setDeleteType("statement");
                              }}
                            >
                              <CloseIcon />
                            </Fab>
                          </Box>
                        </Box>
                      );
                    })}
                    <Button
                      onClick={() => handleEditTruthOrLie(truthOrLieGame)}
                      sx={{ mr: "4px" }}
                    >
                      {EditTitle}
                    </Button>
                    <Button
                      sx={{ color: "red" }}
                      onClick={() => {
                        handleOpen(setOpenDelete);
                        setDeleteId(truthOrLieGame.id);
                        setDeleteType("truthOrLie");
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
      </Box>
    );
  }
};

export default Games;
