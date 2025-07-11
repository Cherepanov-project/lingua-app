import { Box, Container, Typography, Link, Stack, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { CONTACTS, SOCIALS } from "../../constants/footer";
import { footerWrapper, iconStyle } from "./Footer.styles";
import { linkStyle } from "./Footer.styles";

const iconMap = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
};

const Footer = () => {
  return (
    <Box id="footer" py={8} mt={10}>
      <Container maxWidth="lg">
        <Paper elevation={0} sx={footerWrapper}>
          <Grid
            container
            spacing={4}
            justifyContent="space-between"
            alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Связаться с нами
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={1}>
                {CONTACTS.map((item, i) => {
                  const isEmail = item.includes("@");
                  const isURL = item.startsWith("www");

                  if (isEmail) {
                    return (
                      <Link key={i} href={`mailto:${item}`} sx={linkStyle}>
                        {item}
                      </Link>
                    );
                  }

                  if (isURL) {
                    return (
                      <Link
                        key={i}
                        href={`https://${item}`}
                        target="_blank"
                        rel="noopener"
                        sx={linkStyle}>
                        {item}
                      </Link>
                    );
                  }

                  if (isURL) {
                    return (
                      <Link
                        key={i}
                        href={`https://${item}`}
                        target="_blank"
                        rel="noopener"
                        sx={linkStyle}>
                        {item}
                      </Link>
                    );
                  }

                  return (
                    <Typography key={i} variant="body2">
                      {item}
                    </Typography>
                  );
                })}
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Stack
                direction="row"
                spacing={3}
                justifyContent={{ xs: "flex-start", md: "flex-end" }}
                alignItems="center">
                {SOCIALS.map(({ icon, href, color }, i) => {
                  const IconComponent = iconMap[icon as keyof typeof iconMap];
                  return (
                    <Link href={href} target="_blank" rel="noopener" key={i}>
                      <IconComponent sx={iconStyle(color)} />
                    </Link>
                  );
                })}
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Footer;
