import { Alert, Snackbar } from "@mui/material";

interface NotificationProps {
  message: string | null;
  type?: "error" | "success" | "info" | "warning";
  open: boolean;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type = "error",
  open,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={type} onClose={onClose} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
