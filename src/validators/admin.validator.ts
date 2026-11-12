import { NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import { validateId } from "./user.validator";

const registerAdminValidator = [
  // phone, username, email, password, age
  body("username").trim().notEmpty().withMessage("Username is required"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required")
    .withMessage("Invalid phone address"),

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

const createAdminValidator = [
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
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];



const updateAdminValidator = [
  ...validateId,

  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 24 })
    .withMessage("username must be between 3 and 24 characters"),

  body("phone").optional(),

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
];

const createBusValidator = [
  body('car_no').notEmpty().withMessage("enter car number."),
  body("seat_capacity").notEmpty().withMessage("enter seat capacity"),
  body("seat_no").notEmpty().withMessage("enter seat number"),
]

const createBusScheduleValidator = [
  body("bus_id").notEmpty().withMessage("bus id must enter"),
  body("depart_time").notEmpty().withMessage("depart must be enter"),
  body("est_arrival_time").notEmpty().withMessage("est time must be enter"),
  body("per_seat_cost").notEmpty().withMessage("per seat cost must be enter"),
]
const deleteAdminValidator = [...validateId];

export {
  registerAdminValidator,
  createAdminValidator,
  updateAdminValidator,
  deleteAdminValidator,
  createBusValidator,
  createBusScheduleValidator,
};
