import { Box, Button, Input, Modal, Typography } from "@mui/material";
import { stylesObj } from "../../user/stylesObj";
import { MatchGameTitle } from "../../shared/constants/textConsts";
import { useState } from "react";
import { useAddMatchGameMutation } from "../../shared/api/matchGameApi";

interface MatchModalProps {
  open: boolean;
  handleClose: () => void;
  length: number;
}

const MatchGameModal = ({ open, handleClose, length }: MatchModalProps) => {
  const [addGame] = useAddMatchGameMutation();
  const initialState = {
    level: length + 1,
    pairs: {
      0: { left: "", right: "" },
      1: { left: "", right: "" },
      2: { left: "", right: "" },
      3: { left: "", right: "" },
      4: { left: "", right: "" },
    },
  };
  const [newGame, setNewGame] = useState({ ...initialState });
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
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSubmit}>Добавить</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default MatchGameModal;
