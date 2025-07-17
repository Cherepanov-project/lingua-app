import { Button, Input, Typography } from "@mui/material";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function ListeningExercise() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const allowedFormats = [
    "audio/mp3",
    "audio/aac",
    "audio/wav",
    "audio/ogg",
    "audio/flac",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      setError("Файл не выбран");
      return;
    }

    if (!allowedFormats.includes(selectedFile.type)) {
      setError(`Недопустимый формат. Разрешены: ${allowedFormats.join(", ")}`);
      return;
    }

    setFile(selectedFile);
    setError("");
  };

  const handleUpload = () => {
    if (!file) {
      setError("Сначала выберите файл");
      return;
    }

    console.log("Загружаем файл:", file.name);
  };

  return (
    <div>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Выберите файл
        <Input
          type="file"
          sx={{ display: "none" }}
          onChange={handleFileChange}
          inputProps={{ accept: allowedFormats.join(",") }} // Фильтр в диалоге выбора
        />
      </Button>

      {file && (
        <Typography sx={{ mt: 1 }}>
          Выбран: {file.name} ({(file.size / 1024).toFixed(2)} KB)
        </Typography>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!file}
        sx={{ mt: 2 }}
      >
        Загрузить
      </Button>
    </div>
  );
}
