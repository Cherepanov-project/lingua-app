import { Box, Stack, Button, Typography, type SxProps } from "@mui/material";
import { LearnGrammarButton } from "../../../shared/constants/textConsts";
import { Link } from "react-router-dom";

interface GrammarProps {
  item: {
    id: string;
    title: string;
    slug: string;
  };
}

const GrammarCard = ({ item }: GrammarProps) => {
  return (
    <Box
      key={item.id}
      sx={{
        width: "250px",
        height: "280px",
        backgroundColor: "#d2daff",
        borderRadius: "40px",
        padding: "15px",
        display: "flex",
        flexDirection: "column",
      }}
      component="article"
    >
      <Box>
        <img
          src="/grammar-image-document.png"
          alt="grammar"
          style={{ width: "40%", display: "block", margin: "0 auto" }}
        />
      </Box>
      <Stack
        spacing={2}
        useFlexGap
        sx={{
          mt: "15px",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h5">{item.title}</Typography>
        <Button
          component={Link}
          to={`${item.slug}`}
          sx={activationButton}
          variant="contained"
        >
          {LearnGrammarButton}
        </Button>
      </Stack>
    </Box>
  );
};

export { GrammarCard };

///////////////////////////////////////////////////////////////////////////////
const activationButton: SxProps = {
  borderRadius: "3rem",
  color: "white",
  width: "100%",
  mt: "auto",
  mb: 2,
};
