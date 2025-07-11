import type { SxProps, Theme } from "@mui/material";

export const baseButtonStyles: SxProps<Theme> = {
  textTransform: "none",
  "&:focus": { outline: "none" },
  "&:focus-visible": { outline: "none", boxShadow: "none" },
};
