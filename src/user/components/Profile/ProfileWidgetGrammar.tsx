import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { GrammarTitle } from "../../../shared/constants/textConsts";
import { useGetRulesQuery } from "../../../shared/api/grammarApi";
import { ProfileWidgetGrammarSlider } from "./ProfileWidgetGrammarSlider";

const ProfileWidgetGrammar = () => {
  const { data: grammarData } = useGetRulesQuery();

  return (
    <Stack>
      <Stack sx={{ minHeight: "90px" }}>
        <Typography variant="h4">{GrammarTitle}</Typography>
      </Stack>
      {grammarData && <ProfileWidgetGrammarSlider itemList={grammarData} />}
    </Stack>
  );
};

export { ProfileWidgetGrammar };
