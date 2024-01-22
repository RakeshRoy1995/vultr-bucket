import { body } from "express-validator";

export const createBrandSchema = [
  body("name", "Brand Name is required").isString(),
];
export const updateBrandSchema = [
    body("name", "Brand Name is required").isString(),
  ];
