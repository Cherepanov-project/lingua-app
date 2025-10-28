import { Box, Button, Card, CardContent, CardMedia, Container, Stack, TextField, Typography } from '@mui/material';
import { useGetOrthographyExerciseQuery } from '../../../shared/api/orthographyjApi';
import ExercisesHeader from './ExercisesHeader';
import { useOrthography } from './Orthography/useOrtography';

const OrthographyPage = () => {
  const { data: orthographyData, isLoading } = useGetOrthographyExerciseQuery();

  const {
    currentOrthographyData,
    currentWord,
    currentIndex,
    answers,
    wrongIndexes,
    wordCorrect,
    showAnswer,
    setShowAnswer,
    checkAnswer,
    nextWord,
    inputRefs,
    checkButtonRef,
    nextButtonRef,
    handleInputChange,
  } = useOrthography(orthographyData);

  return (
    <Container maxWidth={false} sx={{ backgroundColor: 'white' }}>
      <ExercisesHeader />
      <Container maxWidth="lg" sx={{ backgroundColor: 'white', height: 'calc(100vh - 65px)' }}>
        <Container
          maxWidth="lg"
          sx={{
            borderRadius: '30px',
            backgroundColor: '#D9E0FF',
            padding: '60px',
          }}
        >
          {isLoading ? (
            'ЗАГРУЗКА...'
          ) : (
            <Stack alignItems="center">
              <Typography variant="h3" fontWeight={600}>
                Вставьте пропущенные буквы
              </Typography>

              <Card sx={{ margin: '60px auto', height: '600px', width: '450px', borderRadius: '10%' }}>
                <CardMedia
                  sx={{ objectFit: 'cover', height: '60%' }}
                  component="img"
                  image={currentOrthographyData?.imageUrl}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'left' }}>
                    {currentOrthographyData?.description}
                  </Typography>

                  {showAnswer ? (
                    <Typography
                      variant="h3"
                      component="div"
                      sx={{
                        marginTop: '60px',
                        letterSpacing: '0.2rem',
                        display: 'inline-block',
                        color: 'grey',
                      }}
                    >
                      {orthographyData?.[currentIndex].word}
                    </Typography>
                  ) : (
                    <Typography
                      gutterBottom
                      variant="h3"
                      component="div"
                      sx={{
                        marginTop: '60px',
                        letterSpacing: '0.2rem',
                        display: 'inline-block',
                        background: wordCorrect ? '#c7fdd4' : 'transparent',
                      }}
                    >
                      {currentWord?.map((char, index) => {
                        if (char === '') {
                          return (
                            <Box
                              key={index}
                              component="span"
                              sx={{
                                display: 'inline-block',
                                width: '38px',
                                textAlign: 'center',
                              }}
                            >
                              <TextField
                                value={answers[index] || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                  handleInputChange(e, index, currentWord)
                                }
                                variant="standard"
                                inputRef={(el) => (inputRefs.current[index] = el)}
                                slotProps={{
                                  htmlInput: {
                                    maxLength: 1,
                                  },
                                }}
                                sx={{
                                  verticalAlign: 'bottom',
                                  width: '40px',
                                  marginTop: '0px',
                                  '& .MuiInputBase-input': {
                                    fontSize: '48px',
                                    padding: '0',
                                    height: '1.18em',
                                    textAlign: 'center',
                                    background: wordCorrect
                                      ? '#c7fdd4'
                                      : wrongIndexes.includes(index)
                                        ? '#ffa4ac'
                                        : 'transparent',
                                  },
                                }}
                              />
                            </Box>
                          );
                        } else {
                          return (
                            <Box
                              key={index}
                              component="span"
                              sx={{
                                display: 'inline-block',
                                textAlign: 'center',
                              }}
                            >
                              {char}
                            </Box>
                          );
                        }
                      })}
                    </Typography>
                  )}
                </CardContent>
              </Card>

              <Stack direction="row" spacing={10}>
                <Button
                  onMouseDown={() => setShowAnswer(true)}
                  onMouseUp={() => setShowAnswer(false)}
                  onTouchStart={() => setShowAnswer(true)}
                  onTouchEnd={() => setShowAnswer(false)}
                  variant="contained"
                  sx={{
                    width: '250px',
                    height: '70px',
                    borderRadius: '40px',
                    background: '#F5F5F5',
                  }}
                >
                  <Typography variant="button" sx={{ display: 'block', fontSize: '16px' }}>
                    Показать слово
                  </Typography>
                </Button>

                <Button
                  onClick={checkAnswer}
                  variant="contained"
                  ref={checkButtonRef}
                  sx={{
                    width: '250px',
                    height: '70px',
                    borderRadius: '40px',
                    background: '#ffffff',
                  }}
                >
                  <Typography variant="button" sx={{ display: 'block', fontSize: '16px' }}>
                    Проверить
                  </Typography>
                </Button>

                <Button
                  onClick={nextWord}
                  disabled={!wordCorrect}
                  variant="contained"
                  ref={nextButtonRef}
                  sx={{
                    width: '250px',
                    height: '70px',
                    borderRadius: '40px',
                    background: '#7E94F9',
                  }}
                >
                  <Typography variant="button" sx={{ display: 'block', fontSize: '16px', color: 'white' }}>
                    Следующее слово
                  </Typography>
                </Button>
              </Stack>
            </Stack>
          )}
        </Container>
      </Container>
    </Container>
  );
};

export default OrthographyPage;
