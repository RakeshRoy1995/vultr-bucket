import { Request, Response } from "express";
import logger from "../config/logger";
import { Product, oldproduct, Order } from "../models/Product.model";
import { formatError, formatSuccess } from "../utils/error.util";
import { apiCall, uploadImage } from "../utils/axios.utl";
import fs from "fs";
import { fileRenameAndUpload } from "../common/multer";
import productReview from "../models/Product_review.model";
import mongoose from "mongoose";
const NAMESPACE = "Product Controller";

export const upload_image = async (req: any, res: any) => {
  try {

    let image = await fileRenameAndUpload(req?.files?.image[0]);

    res.json({ success: true, data: image });
  } catch (err: any) {
    logger.error(NAMESPACE, "Create Product error", err);
    res.status(500).json(formatError("SOmething went wrong"));
  }
};