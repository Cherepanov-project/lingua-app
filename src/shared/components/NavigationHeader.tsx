import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import starIcon from '../../assets/star.svg';
import clockIcon from '../../assets/clock.svg';

const NavigationHeader = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            // maxWidth: '1200px',
            mx: 'auto',
            p: '10px 20px',
            boxSizing: 'border-box'
        }}>
            <Typography
                sx={{ fontSize: '48px', fontWeight: 700, color: 'primary.main', cursor: 'pointer' }}
                onClick={() => navigate("/")}
            >
                LinguaStep
            </Typography>
            <Box sx={{display: 'flex', gap: '48px'}}>

                <Button sx={{ textTransform: 'none', color: 'text.primary', fontSize: '24px' }}>
                    Курсы
                </Button>
                <Button sx={{ textTransform: 'none', color: 'text.primary', fontSize: '24px' }}>
                    Главная
                </Button>
                <Button sx={{ textTransform: 'none', color: 'text.primary', fontSize: '24px' }}>
                    Игры
                </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, color: 'text.secondary' }}>
                <Typography sx={{ color: "black", fontSize: "24px" }}>Уровень 3 из 10</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box component="img" src={clockIcon} alt="Clock" sx={{ width: 20, height: 20 }} />
                    <Typography sx={{ color: "black", fontSize: "20px" }}>00:30</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box component="img" src={starIcon} alt="Star" sx={{ width: 40, height: 40 }} />
                    <Typography sx={{ fontSize: "20", fontWeight: 600, color: 'text.primary' }}>20</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default NavigationHeader;