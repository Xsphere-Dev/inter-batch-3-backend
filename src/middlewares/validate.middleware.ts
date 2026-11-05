import { validationResult, type ValidationChain } from "express-validator";
import type { Request, Response, NextFunction } from "express";

export const validate = (...validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: errors.array().map((error) => ({
          field: error.type === "field" ? error.path : undefined,
          message: error.msg,
        })),
      });
    }

    next();
  };
};
