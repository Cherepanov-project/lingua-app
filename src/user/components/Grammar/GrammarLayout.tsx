import { Box, Button, Typography, type SxProps } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRulesQuery } from "../../../shared/api/grammarApi";
import { LoadingTitle, Err, NotFound, Back } from "../../../shared/constants/textConsts";
import type { Grammar } from "../../../types/grammar";

export const GrammarLayout = ({ children }: { children: (grammarItem: Grammar) => React.ReactNode }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: grammarData, isLoading, error } = useGetRulesQuery();

  if (isLoading) return <Typography variant="h5">{LoadingTitle}</Typography>;
  if (error) return <Typography variant="h5">{Err}</Typography>;
  if (!grammarData) return <Typography variant="h5">{Err}</Typography>;

  const grammarItem = grammarData.find(i => i.slug === slug);
  if (!grammarItem) return <Typography variant="h5">{NotFound}</Typography>;

  return (
    <Box padding="20px">
      <Button sx={{...BackButton, ml: 2}} onClick={() => navigate(-1)}>
        {Back}
      </Button>

      {children(grammarItem)}
    </Box>
  );
};

export const BackButton: SxProps = {
  borderRadius: "3rem",
  color: "black",
  width: "auto",
  pr: 2,
  pl: 2,
  mt: "auto",
  backgroundColor: "#d2daff",
  fontWeight: "bold",
};
