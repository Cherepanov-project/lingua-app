import { Box, Stack, Typography } from "@mui/material";
import type { Grammar } from "../../../../types/grammar";

interface GrammarCardProps {
  item: Grammar;
}

const GrammarCard = ({ item }: GrammarCardProps) => {
  return (
    <Box
      key={item.id}
      sx={{
        minWidth: "300px",
        height: "180px",
        backgroundColor: "#d2daffff",
        borderRadius: "40px",
        padding: "15px",
        display: "flex",
        flexDirection: "column",
      }}
      component="article"
    >
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
        <Typography
          variant="h5"
          sx={{
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
        >
          {item.title}
        </Typography>
      </Stack>
    </Box>
  );
};

export { GrammarCard };
