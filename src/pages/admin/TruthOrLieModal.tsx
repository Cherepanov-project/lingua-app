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
  AddNewStatement,
  AddTitle,
  CancelTitle,
  LieTitle,
  SaveTitle,
  TruthOrLieGameTitle,
  TruthTitle,
} from "../../shared/constants/textConsts";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useMemo, useState } from "react";
import {
  useAddTruthOrLieGameMutation,
  useEditTruthOrLieGameMutation,
  type TruthOrLieGame,
} from "../../shared/api/truthOrLieGameApi";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  length: number;
  currentGame?: TruthOrLieGame;
  setCurrentGame: React.Dispatch<
    React.SetStateAction<TruthOrLieGame | undefined>
  >;
  type: "add" | "edit";
}

const TruthOrLieModal = ({
  open,
  handleClose,
  length,
  currentGame,
  setCurrentGame,
  type,
}: ModalProps) => {
  const initialState = useMemo<Omit<TruthOrLieGame, "id">>(() => {
    return currentGame
      ? {
          level: currentGame.level,
          statements: [...currentGame.statements],
        }
      : {
          level: length + 1,
          statements: [],
        };
  }, [length, currentGame]);
  const [newLevel, setNewLevel] = useState({ ...initialState });
  useEffect(() => {
    setNewLevel({ ...initialState });
  }, [initialState]);
  const [addNewLevel] = useAddTruthOrLieGameMutation();
  const [editLevel] = useEditTruthOrLieGameMutation();
  const handleAdd = () => {
    if (newLevel.statements.length < 5) {
      setNewLevel((prev) => {
        return {
          ...prev,
          statements: [
            ...prev.statements,
            { statement: "", correctValue: "false" },
          ],
        };
      });
    }
  };
  const handleChange = (
    { target: { value } }: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    setNewLevel((prev) => {
      return {
        ...prev,
        statements: [
          ...prev.statements.map((statement, index) =>
            index === id ? { ...statement, statement: value } : statement
          ),
        ],
      };
    });
  };
  const handleToggle = (value: string, id: number) => {
    setNewLevel((prev) => {
      return {
        ...prev,
        statements: [
          ...prev.statements.map((statement, index) =>
            index === id ? { ...statement, correctValue: value } : statement
          ),
        ],
      };
    });
  };
  const handleDelete = (id: number) => {
    setNewLevel((prev) => {
      return {
        ...prev,
        statements: [...prev.statements.filter((_, index) => index !== id)],
      };
    });
  };
  const handleSubmit = async () => {
    if (newLevel.statements.length < 1) {
      alert("Добавьте хотя бы одно утверждение");
    } else {
      await addNewLevel({ ...newLevel }).unwrap();
      setNewLevel({ ...initialState });
      handleClose();
    }
  };
  const handleSave = async () => {
    const id = currentGame?.id || 0;
    await editLevel({
      level: newLevel.level,
      id,
      statements: [...newLevel.statements],
    }).unwrap();
    setCurrentGame(undefined);
    setNewLevel({ ...initialState });
    handleClose();
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          ...stylesObj.gamesModal,
          width: "600px",
          height: "400px",
          left: "36%",
          top: "28%",
          overflow: "auto",
        }}
      >
        <Box>
          <Typography variant="h6" component="h2">
            {TruthOrLieGameTitle}
          </Typography>
          <Box>
            {...newLevel.statements.map((_, index) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <Input
                    name="statement"
                    value={newLevel.statements[index].statement}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, index)
                    }
                    sx={{ width: "310px" }}
                  />
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "4px" }}
                  >
                    <ToggleButtonGroup
                      exclusive
                      sx={{ display: "flex", gap: "8px", alignItems: "center" }}
                      value={newLevel.statements[index].correctValue}
                      onChange={(_, value) => handleToggle(value, index)}
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
                      onClick={() => handleDelete(index)}
                    >
                      <CloseIcon />
                    </Fab>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Button
            startIcon={<AddIcon />}
            sx={{ mt: "12px" }}
            onClick={handleAdd}
          >
            {AddNewStatement}
          </Button>
        </Box>
        <Box>
          <Button
            sx={{ color: "gray" }}
            onClick={() => {
              setCurrentGame(undefined);
              setNewLevel({ ...initialState });
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

export default TruthOrLieModal;
