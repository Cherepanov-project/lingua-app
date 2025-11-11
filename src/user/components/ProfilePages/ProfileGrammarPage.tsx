import { Box, Stack, Typography } from "@mui/material";
import { GrammarTitle } from "../../../shared/constants/textConsts";
import { GrammarCard } from "../Grammar/GrammarCard";
import { useGetRulesQuery } from "../../../shared/api/grammarApi";

const ProfileGrammarPage = () => {
  const { data: grammarData } = useGetRulesQuery();

  return (
    <Stack
      direction="row"
      useFlexGap
      sx={{
        overflowY: "scroll",
        scrollbarColor: "#d9e0ff transparent",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-start",
        alignContent: "flex-start",
        maxWidth: "1400px",
        padding: "20px 20px",
        columnGap: "32px",
        rowGap: "32px",
      }}
    >
      <Box sx={{ textAlign: "center", width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          {GrammarTitle}
        </Typography>
      </Box>

      {grammarData &&
        grammarData.map((item) => <GrammarCard key={item.id} item={item} />)}
    </Stack>
  );
};

export { ProfileGrammarPage };
