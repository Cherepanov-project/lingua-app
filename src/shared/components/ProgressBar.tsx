import { Box, CircularProgress } from "@mui/material";


export const ProgressBar = () => {
  return (
    <Box
      sx={{
        flexGrow: '1',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <CircularProgress size="100px" />
    </Box>
  );
};