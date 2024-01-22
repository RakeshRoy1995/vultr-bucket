import { Request, Response } from "express";
import logger from "../config/logger";
import { formatError, formatSuccess } from "../utils/error.util";
import productReview from "../models/Product_review.model";
import { fileRenameAndUpload } from "../common/multer";
const NAMESPACE = "Filter Controller";

// Update FAQ
export const review = async (req: any, res: any) => {
  try {
    let images = [];

    let Found = await productReview.findOne({
      product: req.body.product,
      user: req.body.user,
    });

    if (req.files?.image && req.files.image.length) {
      for (let index = 0; index < req.files?.image.length; index++) {
        let image = await fileRenameAndUpload(req?.files?.image[index]);
        images.push({ actual_img: image });
      }
    }
    let data = { ...req.body, images };

    if (Found) {
      let saveData = await productReview.findByIdAndUpdate(Found._id, data, {
        new: true,
      });

      console.log(`saveData`, saveData);
      res.json(formatSuccess(saveData));
    } else {
      const saveData = new productReview(data);
      await saveData.save();
      res.json(formatSuccess(saveData));
    }
  } catch (err: any) {
    logger.error(NAMESPACE, "Update Filter error", err);
    res.status(500).json(formatError("Server error"));
  }
};
