import { Box, Container, Typography, Link, Stack, Paper } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { CONTACTS, SOCIALS } from "../constants/footer";

const iconMap = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
};

const Footer = () => {
  return (
    <Box py={8} mt={10}>
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            bgcolor: "#D9E0FF",
            borderRadius: "40px",
            p: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Связаться с нами
            </Typography>
            {CONTACTS.map((item, i) => (
              <Typography variant="body2" key={i}>
                {item}
              </Typography>
            ))}
          </Box>

          <Stack direction="row" spacing={3} alignItems="center">
            {SOCIALS.map(({ icon, href, color }, i) => {
              const IconComponent = iconMap[icon as keyof typeof iconMap];
              return (
                <Link href={href} target="_blank" rel="noopener" key={i}>
                  <IconComponent fontSize="large" sx={{ color }} />
                </Link>
              );
            })}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Footer;
