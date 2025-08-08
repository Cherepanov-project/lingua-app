export const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3001"
    : "https://lingua-app-ixnx.onrender.com/api";
