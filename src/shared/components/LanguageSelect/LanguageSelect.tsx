import { useEffect, useState } from "react";
import {
  Box,
  InputBase,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useGetLanguagesQuery } from "../../api/languagesApi";
import {
  inputStyle,
  listItemStyle,
  paperStyle,
  searchWrapperStyle,
} from "./LanguageSelect.styles";

interface LanguageSelectProps {
  label: string;
  storageKey: string;
}

const LanguageSelect = ({ label, storageKey }: LanguageSelectProps) => {
  const { data: languages = [], isLoading, isError } = useGetLanguagesQuery();
  const [selectedLang, setSelectedLang] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setSelectedLang(stored);
      return;
    }

    if (storageKey === "speakingLang") {
      const browserLang = navigator.language.slice(0, 2);
      const match = languages.find((lang) => lang.code === browserLang);
      if (match) {
        setSelectedLang(match.code);
        localStorage.setItem(storageKey, match.code);
      }
    }
  }, [storageKey, languages]);

  const handleSelect = (code: string) => {
    setSelectedLang(code);
    localStorage.setItem(storageKey, code);
  };

  const filteredLanguages = languages.filter((lang) =>
    lang.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h6" mb={1}>
        {label}
      </Typography>
      <Paper elevation={1} sx={paperStyle}>
        <Box sx={searchWrapperStyle}>
          <SearchIcon sx={{ mr: 1, color: "#000000" }} />
          <InputBase
            placeholder="Поиск"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            sx={inputStyle}
          />
        </Box>

        {isLoading ? (
          <Typography>Загрузка...</Typography>
        ) : isError ? (
          <Typography color="error">Ошибка загрузки</Typography>
        ) : (
          <List disablePadding>
            {filteredLanguages.map((lang) => (
              <ListItemButton
                key={lang.code}
                selected={selectedLang === lang.code}
                onClick={() => handleSelect(lang.code)}
                sx={listItemStyle}>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <span>{lang.emoji}</span>
                      <span>{lang.label}</span>
                    </Box>
                  }
                />
              </ListItemButton>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default LanguageSelect;
