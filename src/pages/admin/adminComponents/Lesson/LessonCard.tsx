import { Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Lesson } from "../../../../shared/types/lesson";

interface LessonProps {
  item: Lesson;
}

const LessonCard = ({ item }: LessonProps) => {
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => navigate(`${item.id}`)}
      key={item.id}
      sx={{
        minWidth: "300px",
        height: "180px",
        backgroundColor: "#d2daffff",
        borderRadius: "40px",
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
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
          {item.name}
        </Typography>
      </Stack>
    </Box>
  );
};

export { LessonCard };
