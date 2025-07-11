import { Box, Grid, Paper, Typography } from "@mui/material";
import features from "../../constants/aboutFeatures";
import AboutFeatureCard from "./AboutFeatureCard";
import {
  wrapperStyle,
  textBlockStyle,
  scrollContainerStyle,
  featuresRowStyle,
} from "./AboutSection.styles";

const AboutSection = () => {
  return (
    <Box id="about-section" py={8}>
      <Paper sx={wrapperStyle}>
        <Grid container wrap="nowrap">
          <Grid sx={textBlockStyle}>
            <Typography variant="h4" fontWeight={600} mb={3}>
              О нас
            </Typography>
            <Typography variant="body1">
              Мы — команда лингвистов, разработчиков и дизайнеров,
              объединившихся ради простой идеи: дать каждому человеку
              инструмент, чтобы свободно говорить на иностранном языке.
            </Typography>
          </Grid>

          <Grid sx={scrollContainerStyle}>
            <Box sx={featuresRowStyle}>
              {features.map((item, idx) => (
                <AboutFeatureCard
                  key={idx}
                  emoji={item.emoji}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AboutSection;
