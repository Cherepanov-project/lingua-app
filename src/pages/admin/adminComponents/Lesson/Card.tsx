import { Box, Stack, Typography } from "@mui/material";

interface UniversalCardProps<T> {
  item: T;
  title: keyof T;
}

const Card = <T,>({ item, title }: UniversalCardProps<T>) => {
  return (
    <Box
      sx={{
        minWidth: "300px",
        height: "130px",
        backgroundColor: "#d2daffff",
        borderRadius: "40px",
        padding: "15px",
        display: "flex",
        flexDirection: "column",
      }}
      component="article"
    >
      <Stack
        spacing={2}
        useFlexGap
        sx={{
          mt: "15px",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
        >
          {String(item[title])}
        </Typography>
      </Stack>
    </Box>
  );
};

export { Card };
