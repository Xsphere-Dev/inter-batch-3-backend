import { NextFunction } from "express";
import { body, param, validationResult } from "express-validator";

const registerValidator = [
  body("username").trim().notEmpty().withMessage("Username is required"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];


const validateId = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isInt({ min: 1 })
    .withMessage("id must be positive integer"),
];

const createUserValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 3, max: 24 })
    .withMessage("username must be between 3 and 24 characters"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .withMessage("Invalid phone number"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min:  6})
    .withMessage("Password must be at least 6 characters"),

  body("age")
    .notEmpty()
    .withMessage("Age is required")
    .isInt({ min: 18, max: 110 })
    .withMessage("Age must be between 18 and 110"),
];

const findOneValidator = [
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Invalid email address"),

  body("phone")
    .optional()
    .trim()
    .withMessage("Invalid phone number")
];

const updateUserValidator = [
  ...validateId,

  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 24 })
    .withMessage("username must be between 3 and 24 characters"),

  body("phone")
    .optional()
    .trim()
    .withMessage("Invalid phone number"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("age")
    .optional()
    .isInt({ min: 18, max: 110 })
    .withMessage("Age must be between 18 and 110"),
];

const deleteUserValidator = [...validateId];


export {
  registerValidator,
  validateId,
  createUserValidator,
  findOneValidator,
  updateUserValidator,
  deleteUserValidator,
};
