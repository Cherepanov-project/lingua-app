import { Alert, Box, Button } from "@mui/material";
import type { FallbackProps } from "react-error-boundary";
import { ErrGlobal, Restart } from "../constants/textConsts";

export function GlobalFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Box
      sx={{
        maxWidth: 700,
        width: "100%",
        margin: "0 auto",
        borderRadius: 2,
        border: "2px solid",
      }}
    >
      <Alert
        severity="error"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
        action={
          <Button
            color="inherit"
            sx={{
              borderRadius: 2,
              border: "2px solid",
            }}
            onClick={resetErrorBoundary}
          >
            {Restart}
          </Button>
        }
      >
        {ErrGlobal} {error.message}
      </Alert>
    </Box>
  );
}
