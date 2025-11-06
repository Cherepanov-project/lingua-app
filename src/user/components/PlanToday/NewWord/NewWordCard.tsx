import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";


interface NewWordCardProps {
  title: string;
  id: number;
}

export const NewWordCard: React.FC<NewWordCardProps> = ( {title, id} ) => {
  return (
    <Card
      sx={{
        backgroundColor: "#D2DAFF",
        borderRadius: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          {title}
        </Typography>
        <Button variant="contained" sx={{color: 'white', borderRadius: "3rem"}} component={Link} to={`${id}`}>
          Продолжить
        </Button>
      </CardContent>
    </Card>
  );
};