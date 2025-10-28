export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ""; // use relative /api via Vercel rewrite
export const SITE_URL = `${window.location.protocol}//${window.location.host}`;
