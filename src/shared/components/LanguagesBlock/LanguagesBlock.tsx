import { Box, Grid } from "@mui/material";
import LanguageSelect from "../LanguageSelect/LanguageSelect";
import SelectImage from "../../../assets/select_section.png";
import { imageStyles } from "./LanguagesBlock.styles";

const LanguagesBlock = () => {
  return (
    <Box py={6}>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        <Box sx={{ maxWidth: 300, mx: "auto" }}>
          <LanguageSelect label="Я хочу изучать" storageKey="learningLang" />
        </Box>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            component="img"
            src={SelectImage}
            alt="Language selection illustration"
            sx={imageStyles}
          />
        </Grid>

        <Box sx={{ maxWidth: 300, mx: "auto" }}>
          <LanguageSelect label="Я говорю" storageKey="speakingLang" />
        </Box>
      </Grid>
    </Box>
  );
};

export default LanguagesBlock;
