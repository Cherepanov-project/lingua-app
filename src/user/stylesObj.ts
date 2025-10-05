import type { CSSProperties } from "@mui/material/styles";
import type { SystemStyleObject } from "@mui/system";
import { createTheme } from "@mui/material/styles";

interface StyleObject {
  // authTextField: CSSProperties;
  authTextField: SystemStyleObject;
  authBox: SystemStyleObject;
  title: CSSProperties;
  subtitle: CSSProperties;
  loginLinks: CSSProperties;
  loginLink: CSSProperties;
  loginButton: CSSProperties;
  starsIcons: CSSProperties;
}

export const vars = {
  color: {
    primary: "#7e94f9",
  },
};

export const stylesObj: StyleObject = {
  authBox: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    padding: "40px 100px 87px",
    borderRadius: "50px",
    maxWidth: 500,
    minHeight: 608,
    margin: "0 auto",
  },
  authTextField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "50px",
      height: "40px",
      padding: "0 20px",
      border: "1px solid #878787",
      width: "100%",
      "& input:-webkit-autofill": {
        WebkitBackgroundClip: "text",
        backgroundColor: "transparent !important",
        WebkitTextFillColor: "currentColor",
      },
      "& input:-webkit-autofill:hover, & input:-webkit-autofill:focus": {
        WebkitBackgroundClip: "text",
        backgroundColor: "transparent !important",
        WebkitTextFillColor: "currentColor",
      },
    },
  },
  title: {
    color: "#8b9dfc",
    marginBottom: "6px",
    fontFamily: "Manrope, sans-serif",
    fontWeight: 800,
    fontSize: "48px",
  },
  subtitle: {
    mb: "70px",
    fontFamily: "Manrope, sans-serif",
    fontWeight: 400,
    fontSize: "36px",
    color: "black",
    textAlign: "center",
  },
  loginLinks: {
    marginTop: "45px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    "& p": {
      textAlign: "center",
    },
  },
  loginLink: {
    fontFamily: "Manrope, sans-serif",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "30px",
    textDecoration: "none",
    color: "#8b9dfc",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  loginButton: {
    fontFamily: "Manrope, sans-serif",
    fontWeight: 500,
    fontSize: "20px",
    width: "100%",
    height: "50px",
    backgroundColor: vars.color.primary,
    color: "#fff",
    borderRadius: "50px",
    marginTop: "40px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#8b9dfc",
    },
  },
  starsIcons: {
    fontSize: "20px",
    color: "#7e94f9",
  },
};

export const authTheme = createTheme({
  palette: {
    primary: {
      main: vars.color.primary,
    },
    background: {
      default: "#D9E0FF",
    },
  },
});
