import { Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CourseProps {
  item: {
    id: number;
    language: string;
    level: string;
    modules: string[];
    published: boolean;
    description: string;
  };
}

const CoursesCard = ({ item }: CourseProps) => {
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => navigate(`${item.id}`)}
      key={item.id}
      sx={{
        width: "250px",
        height: "280px",
        backgroundColor: "#d2daffff",
        borderRadius: "40px",
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
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
        <Typography variant="h5">{item.language}</Typography>
        <Typography variant="h5">{item.level}</Typography>
      </Stack>
    </Box>
  );
};

export { CoursesCard };
