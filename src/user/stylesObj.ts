import type { CSSProperties } from "@mui/material/styles";
import type { SystemStyleObject } from "@mui/system";
import { createTheme } from "@mui/material/styles";

interface StyleObject {
  authTextField: SystemStyleObject;
  authBox: SystemStyleObject;
  title: CSSProperties;
  subtitle: CSSProperties;
  loginLinks: CSSProperties;
  loginLink: CSSProperties;
  loginButton: CSSProperties;
  starsIcons: CSSProperties;
  adminPageTitle: CSSProperties;
  adminButton: CSSProperties;
  gamesModal: CSSProperties;
  gameTitle: CSSProperties;
  toggleButton: CSSProperties;
  registerInput: CSSProperties;
  afterLoginForm: CSSProperties;
  afterLoginText: CSSProperties;
  modal: CSSProperties;
  courseButton: CSSProperties;
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
    padding: "40px 100px 57px",
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
      "&:last-child": {
        marginBottom: "5px",
      },
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
  registerInput: {
    marginBottom: "15px",
    borderRadius: "10px",
    height: "40px",
    width: "100%",
    "& .MuiSelect-select": {
      display: "flex",
      alignItems: "center",
      height: "40px",
      boxSizing: "border-box",
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
    mb: "20px",
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
  adminPageTitle: {
    fontWeight: "600",
    fontSize: "34px",
    lineHeight: "175%",
    color: "#000",
  },
  adminButton: {
    fontWeight: "600",
    textTransform: "none",
    fontSize: "16px",
    color: "#fff",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "rgb(126, 148, 210)",
    },
    borderRadius: "20px",
    height: "55px",
  },
  gamesModal: {
    backgroundColor: "#fff",
    position: "absolute",
    top: "35%",
    left: "43%",
    p: "24px",
    borderRadius: "5px",
    width: "320px",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  gameTitle: {
    fontWeight: "500",
    fontSize: "28px",
  },
  toggleButton: {
    " &.MuiToggleButtonGroup-grouped": {
      borderRadius: "8px",
      border: "0.5px solid #000",
    },
    width: "85px",
    height: "35px",
    color: "#000",
    textTransform: "none",
    fontSize: "18px",
    "&.Mui-selected": {
      border: "none",
      backgroundColor: "#eff2ff",
      "&:hover": {
        backgroundColor: "rgba(215, 219, 237, 1)",
      },
    },
  },

  afterLoginForm: {
    width: 600,
    padding: "30px",
    background: "white",
    borderRadius: "20px",
    boxShadow: "0 6px 30px rgba(0,0,0,0.1)",
    marginTop: "20px",
  },

  afterLoginText: {
    textAlign: "center",
    marginBottom: "10px",
    fontWeight: 700,
    color: "#000",
  },
  modal: {
    position: "fixed",
    top: "50%",
    left: "calc(50% + 137.5px)",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "20px",
    boxShadow: "24",
    p: 4,
  },

  courseButton: {
    border: "2px solid #020202ff",
    borderRadius: "14px",
    width: "250px",
    color: "black",
    fontWeight: "bold",
    backgroundColor: "#d2daffff",
    "&:hover": {
      backgroundColor: "#b4c2ff",
      color: "black",
    },
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
