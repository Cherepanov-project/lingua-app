import type { SxProps, Theme } from "@mui/material";

export const footerWrapper: SxProps<Theme> = {
  backgroundColor: "#D9E0FF",
  borderRadius: "40px",
  p: 4,
};

export const iconStyle = (color: string): SxProps<Theme> => ({
  color,
  fontSize: 46,
  transition: "color 0.2s ease",
  "&:hover": {
    color: "#5b61fa",
  },
});

export const linkStyle: SxProps<Theme> = {
  color: "inherit",
  textDecoration: "none",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#5b61fa",
  },
};
