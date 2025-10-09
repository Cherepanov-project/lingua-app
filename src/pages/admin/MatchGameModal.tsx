import { Box, Button, Input, Modal, Typography } from "@mui/material";
import { stylesObj } from "../../user/stylesObj";
import { AddTitle, CancelTitle, MatchGameTitle, SaveTitle } from "../../shared/constants/textConsts";
import { useEffect, useMemo, useState } from "react";
import {
  useAddMatchGameMutation,
  useEditMatchGameMutation,
  type MatchGame,
} from "../../shared/api/matchGameApi";

interface MatchModalProps {
  open: boolean;
  handleClose: () => void;
  length: number;
  currentGame?: MatchGame;
  setCurrentGame: React.Dispatch<React.SetStateAction<MatchGame | undefined>>;
  type: "add" | "edit";
}

const MatchGameModal = ({
  open,
  handleClose,
  length,
  currentGame,
  setCurrentGame,
  type,
}: MatchModalProps) => {
  const [addGame] = useAddMatchGameMutation();
  const [editGame] = useEditMatchGameMutation();
  const initialState = useMemo(() => {
    return currentGame
      ? {
          level: currentGame.level,
          pairs: {
            0: { ...currentGame.pairs[0] },
            1: { ...currentGame.pairs[1] },
            2: { ...currentGame.pairs[2] },
            3: { ...currentGame.pairs[3] },
            4: { ...currentGame.pairs[4] },
          },
        }
      : {
          level: length + 1,
          pairs: {
            0: { left: "", right: "" },
            1: { left: "", right: "" },
            2: { left: "", right: "" },
            3: { left: "", right: "" },
            4: { left: "", right: "" },
          },
        };
  }, [currentGame, length]);
  const [newGame, setNewGame] = useState({ ...initialState });
  useEffect(() => {
    setNewGame({ ...initialState });
  }, [initialState]);
  const handleChange = (
    index: number,
    { target: { value, name } }: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewGame((prev) => {
      return {
        ...prev,
        pairs: {
          ...prev.pairs,
          [index]: {
            ...prev.pairs[index as keyof typeof prev.pairs],
            [name]: value,
          },
        },
      };
    });
  };
  const handleSubmit = async () => {
    await addGame({
      level: newGame.level,
      pairs: [
        { ...newGame.pairs[0] },
        { ...newGame.pairs[1] },
        { ...newGame.pairs[2] },
        { ...newGame.pairs[3] },
        { ...newGame.pairs[4] },
      ],
    }).unwrap();
    setNewGame({ ...initialState });
    handleClose();
  };
  const handleSave = async () => {
    const id = currentGame?.id || 0;
    await editGame({
      level: newGame.level,
      id,
      pairs: [
        { ...newGame.pairs[0] },
        { ...newGame.pairs[1] },
        { ...newGame.pairs[2] },
        { ...newGame.pairs[3] },
        { ...newGame.pairs[4] },
      ],
    }).unwrap();
    setCurrentGame(undefined);
    setNewGame({ ...initialState });
    handleClose();
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...stylesObj.gamesModal }}>
        <Box>
          <Typography variant="h6" component="h2">
            {MatchGameTitle}
          </Typography>
          <Box>
            {new Array(5).fill("").map((_, index) => {
              return (
                <Box sx={{ display: "flex" }} key={index}>
                  <Input
                    name="left"
                    value={
                      newGame.pairs[index as keyof typeof newGame.pairs].left
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(index, e)
                    }
                  />
                  <Input
                    name="right"
                    value={
                      newGame.pairs[index as keyof typeof newGame.pairs].right
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(index, e)
                    }
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box>
          <Button
            sx={{ color: "gray" }}
            onClick={() => {
              setCurrentGame(undefined);
              setNewGame({ ...initialState });
              handleClose();
            }}
          >
            {CancelTitle}
          </Button>
          {type === "add" ? (
            <Button onClick={handleSubmit}>{AddTitle}</Button>
          ) : (
            <Button onClick={handleSave}>{SaveTitle}</Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default MatchGameModal;
