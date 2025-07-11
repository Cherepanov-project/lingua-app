import type { SxProps, Theme } from "@mui/material";

export const paperStyle: SxProps<Theme> = {
  p: 1.5,
  borderRadius: 4,
  backgroundColor: "#D9E0FF",
  maxHeight: 300,
  overflowY: "auto",
};

export const searchWrapperStyle: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  mb: 1.5,
  px: 1,
  py: 0.5,
  borderRadius: 2,
  backgroundColor: "white",
};

export const inputStyle: SxProps<Theme> = {
  fontSize: 14,
};

export const listItemStyle: SxProps<Theme> = {
  borderRadius: 2,
  mb: 0.5,
};
