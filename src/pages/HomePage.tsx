import {
  Box,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../shared/components/Header";
import Footer from "../shared/components/Footer";
import LanguagesBlock from "../shared/components/LanguagesBlock/LanguagesBlock";
import StatsSection from "../shared/components/StatsSection/StatsSection";
import AboutSection from "../shared/components/AboutSection/AboutSection";
import NavigationButton from "../shared/components/NavigationButton";

const HomePage = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  const handleStartClick = () => {
    const storedLang = localStorage.getItem("learningLang");
    if (!storedLang) {
      setShowDialog(true);
      return;
    }
    navigate("/auth");
  };

  const handleAboutClick = () => {
    const about = document.getElementById("about-section");
    if (about) about.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Container maxWidth="lg">
      <Header />
      <Box component="main" sx={{ mt: 4 }}>
        <Box textAlign="center" py={8}>
          <Typography variant="h3" fontWeight={600}>
            Изучайте любой язык,
            <br />
            Говорите уверенно!
          </Typography>
          <Box mt={4} display="flex" justifyContent="center" gap={2}>
            <NavigationButton
              to="/auth"
              variant="contained"
              color="primary"
              onClick={handleStartClick}>
              Начать учиться
            </NavigationButton>
            <NavigationButton
              to="#about"
              variant="outlined"
              onClick={handleAboutClick}>
              О нас
            </NavigationButton>
          </Box>
        </Box>

        <LanguagesBlock />
        <StatsSection />
        <AboutSection />
      </Box>
      <Footer />

      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Выберите язык"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Пожалуйста, выберите язык, который хотите изучать.
          </Typography>
        </DialogContent>
        <DialogActions>
          <NavigationButton to="/" color="primary">
            Закрыть
          </NavigationButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HomePage;
