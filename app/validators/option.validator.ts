import { body } from "express-validator";

export const createOptionSchema = [
  body("name", "option Name is required").isString(),
];
export const UpdateOptionSchema = [
    body("name", "option Name is required").isString(),
  ];
export const createValuesSchema = [
  body("name", "option value Name is required").isString(),
];
export const updateValuesSchema = [
    body("name", "option value Name is required").isString(),
  ];
