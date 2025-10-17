import type { SxProps } from "@mui/material";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";

interface ChallengeItemProps {
  itemTitle: string;
  imageUrl: string;
}

const ChallengeItem: React.FC<ChallengeItemProps> = ({ itemTitle, imageUrl }) => {
  return (
    <Stack sx={challengeItem} direction={"row"}>
      <Box>
        <Typography variant="h6" sx={{ marginBottom: "10px" }}>
          {itemTitle}
        </Typography>
        <Button sx={challengeButton} variant="outlined">
          Начать
        </Button>
      </Box>
      <Box sx={challengeIcon}>
        <img style={{ width: "100%" }} src={imageUrl} />
      </Box>
    </Stack>
  );
};

export { ChallengeItem };

///////////////////////////////////////////////////////////////////////////////

const challengeItem: SxProps = {
  backgroundColor: "#eeeeee",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 20px",
  borderRadius: "40px",
  width: 215,
};

const challengeButton: SxProps = {
  padding: "2px 30px",
  borderRadius: "2rem",
  border: "1px solid #000000",
  color: "#000000",
  textTransform: "inherit",

  "&:hover": {
    backgroundColor: "#7E94F9",
    border: "1px solid #7E94F9",
    color: "#ffffff",
  },
};

const challengeIcon: SxProps = {
  width: "50px",
};
