import { Box, Typography, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useState } from "react";
import NavigationButton from "../shared/components/NavigationButton";
import NavigationHeader from "../shared/components/NavigationHeader";
import heartIcon from '../assets/Heart.svg'

const StyledNavigationButton = styled(NavigationButton)({
    padding: '10px 30px',
    // '&:hover': {
    //
    // },
});

const russian = ["Яблоко", "Машина", "Дом", "Собака", "Кошка"];
const english = ["Apple", "Dog", "Cat", "House", "Car"];

const buttonStyles = {
    width: '400px',
    height: '70px',
    borderRadius: '50px',
    fontSize: '32px',
    textTransform: 'none',
    color: 'text.primary',
};

const MatchGame = () => {
    const [activeRussian, setActiveRussian] = useState<string[]>(['Яблоко', 'Машина']);
    const [activeEnglish, setActiveEnglish] = useState<string[]>(['Apple', 'Car']);

    const toggleRussian = (word: string) => {
        setActiveRussian(prev =>
            prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
        );
    };

    const toggleEnglish = (word: string) => {
        setActiveEnglish(prev =>
            prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
        );
    };

    return (
        <Box sx={{
            backgroundColor: 'background.paper',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <NavigationHeader />

            <Box sx={{
                width: '100%',
                flexGrow: 1,
                backgroundColor: 'background.default',
                borderRadius: '40px 40px 0 0',
                marginTop: '-10px',
                paddingTop: '60px',
                paddingLeft: 5,
                paddingRight: 5,
                paddingBottom: 5,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, color: 'error.main' }}>
                        <Box component="img" src={heartIcon} sx={{ width: '40px', height: '40px' }} />
                        <Box component="img" src={heartIcon} sx={{ width: '40px', height: '40px' }} />
                        <Box component="img" src={heartIcon} sx={{ width: '40px', height: '40px' }} />
                    </Box>
                    <Typography variant="h3" sx={{ fontSize: '36px', fontWeight: '400', color: 'text.primary' }}>Соедени пары</Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    flexGrow: 1,
                    my: 2,
                    gap: '265px'
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        {russian.map((word) => {
                            const isActive = activeRussian.includes(word);
                            const backgroundColor = isActive ? '#FFD186' : 'background.paper';
                            return (
                                <Button key={word} onClick={() => toggleRussian(word)} variant="contained" sx={{
                                    ...buttonStyles,
                                    backgroundColor,
                                    '&:hover': { backgroundColor }
                                }}>
                                    {word}
                                </Button>
                            );
                        })}
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        {english.map((word) => {
                            const isActive = activeEnglish.includes(word);
                            const backgroundColor = isActive ? '#FF86C1' : 'background.paper';
                            return (
                                <Button key={word} onClick={() => toggleEnglish(word)} variant="contained" sx={{
                                    ...buttonStyles,
                                    backgroundColor,
                                    '&:hover': { backgroundColor }
                                }}>
                                    {word}
                                </Button>
                            );
                        })}
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <Typography sx={{ mb: 3, color: 'text.secondary' }}>
                        <Box component="span" sx={{ fontWeight: 'bold' }}>3/10</Box> пройдено
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, width: '100%' }}>
                        <Button variant="contained" sx={{
                            borderRadius: '50px', textTransform: 'none', fontSize: 16, padding: '10px 30px',
                            backgroundColor: 'background.paper', color: 'text.secondary', '&:hover': { backgroundColor: 'background.paper' }
                        }}>
                            Показать ответы
                        </Button>
                        <Button variant="contained" sx={{
                            borderRadius: '50px', textTransform: 'none', fontSize: 16, padding: '10px 30px',
                            backgroundColor: 'background.paper', color: 'text.primary', '&:hover': { backgroundColor: 'background.paper' }
                        }}>
                            Перезапустить
                        </Button>
                        <StyledNavigationButton to="#" variant="contained" color="primary">
                            Следующий уровень
                        </StyledNavigationButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MatchGame;