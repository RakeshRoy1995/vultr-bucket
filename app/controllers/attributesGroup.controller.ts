import { Request, Response } from "express";
import logger from "../config/logger";
// import { iApiUser } from '../interfaces/auth.interface';
import AttributesGroup from "../models/AttributesGroup.model";
import { formatError } from "../utils/error.util";
const NAMESPACE = "AttributesGroup Controller";

// Create
export const create = async (req: any, res: any) => {
  try {
    const { name, serial, merchant_id, status } = req.body;
    const newAttributesGroup = new AttributesGroup({
      name,
      serial,
      merchant_id,
      status,
    });
    await newAttributesGroup.save();

    res.json({ success: true, newAttributesGroup });
  } catch (err: any) {
    logger.error(NAMESPACE, "Create AttributesGroup error", err);
    res.status(500).json(formatError(err));
  }
};

// Update
export const update = async (req: any, res: any) => {
  try {
    const { id, name, serial } = req.body;
    const Found = await AttributesGroup.findById(id);

    if (!Found) {
      return res.status(404).json(formatError("Faq not found"));
    }

    const to_update: any = {
      name,
      serial,
    };

    await AttributesGroup.findByIdAndUpdate(id, to_update);

    res.json({ success: true });
  } catch (err: any) {
    logger.error(NAMESPACE, "Update AttributesGroup error", err);
    res.status(500).json(formatError("Server error"));
  }
};

export const updates = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const { name, serial, status } = req.body;
    const Found = await AttributesGroup.findById(id);

    if (!Found) {
      return res.status(404).json(formatError("Faq not found"));
    }

    const to_update: any = {
      name,
      serial,
      status,
    };

    const data = await AttributesGroup.findByIdAndUpdate(id, to_update);
    const messege = "updated successfully";

    res.json({ data: data, payload: messege });
  } catch (err: any) {
    logger.error(NAMESPACE, "Update  error", err);
    res.status(500).json(formatError("Server error"));
  }
};
// View Single
export const single = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const Found = await AttributesGroup.findById(id);

    if (!Found) {
      return res.status(404).json(formatError("Not found"));
    }

    res.json({ data: Found });
  } catch (err: any) {
    logger.error(NAMESPACE, "View single data error", err);
    res.status(500).json(formatError("Server error"));
  }
};

// delete
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const Found = await AttributesGroup.findById(id);

    if (!Found) {
      return res.status(404).json(formatError("Not found"));
    }

    await AttributesGroup.findByIdAndDelete(id);

    res.json({ msg: "success" });
  } catch (err: any) {
    logger.error(NAMESPACE, "Delete  error", err);
    res.status(500).json(formatError("Server error"));
  }
};

// Get All
export const getAll = async (req: any, res: Response) => {
  try {
    const items_per_page = parseInt(req.query.items_per_page) || 0;
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search;
    const user_id = req.query.user_id;
    let count;
    let data;
    if (user_id) {
      count = await AttributesGroup.count({ merchant_id: user_id });
      data = await AttributesGroup.find({ merchant_id: user_id })
        .limit(items_per_page * 1)
        .skip((page - 1) * items_per_page);
    } else {
      count = await AttributesGroup.count({});
      data = await AttributesGroup.find({})
        .limit(items_per_page * 1)
        .skip((page - 1) * items_per_page);
    }
    const pagination = {
      items_per_page,
      page,
      totalCount: count,
    };

    if (search) {
      const result: any = data.filter(({ name }: any) =>
        name.toLowerCase().includes(search.toLowerCase())
      );
      // console.log(result)
      if (result.length > 0) {
        return res.json({ data: result });
      } else {
        return res.json({ data: [] });
      }
    } else {
      return res.json({ data: data, payload: { pagination: pagination } });
    }
  } catch (err: any) {
    logger.error(NAMESPACE, "View all data error", err);
    res.status(500).json(formatError("Server error"));
  }
};
