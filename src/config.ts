export const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://wandersync-backend.onrender.com"
    : "http://localhost:8000");
