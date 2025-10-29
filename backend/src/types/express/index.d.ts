// Augment Express 5 request type (from express-serve-static-core)
declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

export {};
