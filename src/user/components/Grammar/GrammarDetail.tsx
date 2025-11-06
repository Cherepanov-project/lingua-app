import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Typography, type SxProps } from "@mui/material";
import {
  Back,
  NotFound,
  LoadingTitle,
  Err,
} from "../../../shared/constants/textConsts";
import { useGetRulesQuery } from "../../../shared/api/grammarApi";

export const GrammarDetailPage = () => {
  const { data: grammarData, isLoading, error } = useGetRulesQuery();
  const { slug } = useParams();
  const navigate = useNavigate();

  if (isLoading) {
    return <Typography variant="h5">{LoadingTitle}</Typography>;
  }

  if (error) {
    return <Typography variant="h5">{Err}</Typography>;
  }

  if (!grammarData) {
    return (
      <Typography variant="h5" sx={{ mt: 2 }}>
        {Err}
      </Typography>
    );
  }

  const grammarItem = grammarData.find((i) => i.slug === slug);

  if (!grammarItem) {
    return (
      <Typography variant="h5" sx={{ mt: 2 }}>
        {NotFound}
      </Typography>
    );
  }

  return (
    <Box padding="20px">
      <Button sx={BackButton} onClick={() => navigate(-1)}>
        {Back}
      </Button>

      <Typography variant="h3" sx={{ mt: 2, mb: 3 }}>
        {grammarItem.title}
      </Typography>

      <Typography variant="h5" sx={{ mt: 1 }}>
        {grammarItem.text}
      </Typography>
    </Box>
  );
};

///////////////////////////////////////////////////////////////////////////////
const BackButton: SxProps = {
  borderRadius: "3rem",
  color: "black",
  width: "100px",
  mt: "auto",
  mb: 2,
  backgroundColor: "#d2daff",
  fontWeight: "bold",
};
