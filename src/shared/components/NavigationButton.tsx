import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

interface NavigationButtonProps {
  to: string;
  children: ReactNode;
  variant?: "text" | "outlined" | "contained";
  color?: "inherit" | "primary" | "secondary";
  onClick?: () => void;
}

const NavigationButton = ({
  to,
  children,
  variant = "contained",
  color,
  onClick,
}: NavigationButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    else navigate(to);
  };

  return (
    <Button
      variant={variant}
      color={color}
      onClick={handleClick}
      sx={{
        textTransform: "none",
        fontSize: 16,
        padding: "6px 24px",
        borderRadius: 999,
        boxShadow:
          variant === "contained" ? "0px 4px 10px rgba(0, 0, 0, 0.1)" : "none",
        backgroundColor: variant === "contained" ? "#7E94F9" : "inherit",
        "&:hover": {
          backgroundColor: variant === "contained" ? "#6c84e6" : "inherit",
        },
      }}>
      {children}
    </Button>
  );
};

export default NavigationButton;
