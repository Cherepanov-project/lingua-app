import { Paper, Typography } from "@mui/material";
import { cardStyle } from "./AboutFeatureCard.styles";

type Props = {
  emoji: string;
  title: string;
  description: string;
};

const AboutFeatureCard = ({ emoji, title, description }: Props) => (
  <Paper sx={cardStyle}>
    <Typography fontSize={40} mb={2}>
      {emoji}
    </Typography>
    <Typography fontWeight={600} mb={1}>
      {title}
    </Typography>
    <Typography variant="body2">{description}</Typography>
  </Paper>
);

export default AboutFeatureCard;
