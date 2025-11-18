import { useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { EngLanguage, MissWords } from "../../../shared/constants/textConsts";
import { GrammarLayout } from "./GrammarLayout";
import { useGetGrammarExercisesByLevelQuery } from "../../../shared/api/grammarExercisesApi";
import { useGetRulesQuery } from "../../../shared/api/grammarApi";
import { useGrammarExercise } from "./hooks/useGrammarExercise";

export const GrammarExercise = () => {
  const { slug, level } = useParams();
  const { data: exercises } = useGetGrammarExercisesByLevelQuery(`${level}`);
  const { data: grammarData } = useGetRulesQuery();

  const grammarItem = grammarData?.find((i) => i.slug === slug);
  const exercisesItem = exercises?.find(
    (ex) => ex.grammar_id === Number(grammarItem?.id)
  );
  const missing_words = exercisesItem?.missing_words ?? [];
  const sentence = exercisesItem?.sentence ?? "";

  const { userAnswers, isChecked, result, handleChange, handleCheck } =
    useGrammarExercise(missing_words);

  return (
    <GrammarLayout>
      {(grammarItem) => (
        <Box
          sx={{
            padding: "20px",
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            {grammarItem.title}
          </Typography>

          <Typography variant="h6" sx={{ color: "#666", mb: 3 }}>
            {EngLanguage} {level}
          </Typography>

          <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
            {MissWords}
          </Typography>

          <Typography
            component="div"
            sx={{
              backgroundColor: "#f6f8ff",
              borderRadius: "1rem",
              padding: "20px",
              maxWidth: "800px",
              lineHeight: 1.8,
              textAlign: "center",
              fontSize: "1.2rem",
            }}
          >
            {sentence.split("____").map((part, index) => (
              <span key={index}>
                {part}
                {index < missing_words.length && (
                  <TextField
                    variant="outlined"
                    size="small"
                    value={userAnswers[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    sx={{
                      width: "100px",
                      mx: 1,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "1rem",
                      },
                    }}
                  />
                )}
              </span>
            ))}
          </Typography>

          <Button
            variant="contained"
            onClick={handleCheck}
            sx={{
              borderRadius: "3rem",
              mt: 4,
              backgroundColor: "#d2daff",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Проверить
          </Button>

          {isChecked && (
            <Typography
              sx={{
                mt: 3,
                fontWeight: "bold",
                color: result?.includes("правильные") ? "green" : "red",
              }}
            >
              {result}
            </Typography>
          )}
        </Box>
      )}
    </GrammarLayout>
  );
};
