import { body } from "express-validator";

export const createTagSchema = [
  body("name", "Tag Name is required").isString(),
  body("status", "status is required").isString(),
];
export const updateTagSchema = [
    body("name", "Tag Name is required").isString(),
  ];
