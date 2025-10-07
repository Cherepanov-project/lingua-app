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
  const [newGame, setNewGame] = useState({
    level: length + 1,
    pairs: {
      0: { russian: "", english: "" },
      1: { russian: "", english: "" },
      2: { russian: "", english: "" },
      3: { russian: "", english: "" },
      4: { russian: "", english: "" },
    },
  });
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
    console.log(newGame);
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
                    name="russian"
                    value={
                      newGame.pairs[index as keyof typeof newGame.pairs].russian
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(index, e)
                    }
                  />
                  <Input
                    name="english"
                    value={
                      newGame.pairs[index as keyof typeof newGame.pairs].english
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
