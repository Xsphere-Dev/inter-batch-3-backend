// src/types/express.d.ts

import { AccessTokenPayload } from "./user.type";

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
    }
  }
}

// Ensure this file is treated as a module by adding an export statement (if not already importing/exporting)
export {};
