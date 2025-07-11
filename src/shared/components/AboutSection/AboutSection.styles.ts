import type { SxProps, Theme } from "@mui/material";

export const wrapperStyle: SxProps<Theme> = {
  p: 4,
  borderRadius: 4,
  boxShadow: "none",
  border: "none",
};

export const textBlockStyle: SxProps<Theme> = {
  minWidth: { xs: "100%", md: 300 },
  maxWidth: { md: 350 },
  pr: { md: 4 },
  flexShrink: 0,
};

export const scrollContainerStyle: SxProps<Theme> = {
  width: "100%",
  minWidth: 0,
  overflowX: "auto",
  flexGrow: 1,
};

export const featuresRowStyle: SxProps<Theme> = {
  display: "flex",
  gap: 3,
  pb: 2,
  scrollSnapType: "x mandatory",
  "& > *": { scrollSnapAlign: "start" },
};
