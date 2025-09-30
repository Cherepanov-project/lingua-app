import { Box, Button, Modal, Typography } from "@mui/material";
import { stylesObj } from "../../user/stylesObj";
import { AddNewGame, GamesTitle } from "../../shared/constants/textConsts";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

const Games = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
          sx={{
            fontWeight: "600",
            textTransform: "none",
            fontSize: "16px",
            color: "#fff",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
              backgroundColor: "rgb(126, 148, 210)",
            },
            borderRadius: "20px",
            height: "55px",
          }}
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
            top: "50%",
            left: "50%",
            p: "24px",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6" component="h2">
            {AddNewGame}
          </Typography>
          <Button sx={{ mt: "12px" }} variant="contained">
            Найди пару
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Games;
