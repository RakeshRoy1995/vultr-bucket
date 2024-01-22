import { body } from "express-validator";

export const createFilterSchema = [
  body("name", "Filter Name is required").isString(),
];
export const updateFilterSchema = [
  body("name", "Filter Name is required").isString(),
];

export const createValuesSchema = [
  body("name", "Filter values Name is required").isString(),
];
export const updateValuesSchema = [
  body("name", "Filter values Name is required").isString(),
];
