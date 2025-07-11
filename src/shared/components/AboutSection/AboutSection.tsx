import { Box, Grid, Paper, Typography } from "@mui/material";
import features from "../../constants/aboutFeatures";
import AboutFeatureCard from "./AboutFeatureCard";
import { aboutText } from "../../constants/aboutText";
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
              {aboutText.title}
            </Typography>
            <Typography variant="body1">{aboutText.description}</Typography>
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
