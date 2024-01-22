import { Request, Response } from "express";
import logger from "../config/logger";
// import { iApiUser } from '../interfaces/auth.interface';
import { Option, OptionValues } from "../models/Option.model";
// import values  from '../models/Option.model';
import { formatError } from "../utils/error.util";
const NAMESPACE = "Option Controller";

// Create
export const create = async (req: any, res: any) => {
  try {
    const { merchant_id, name, type, serial, status } = req.body;
    const newOption = new Option({ name, type, serial, merchant_id, status });
    await newOption.save();

    res.json({ success: true, newOption });
  } catch (err: any) {
    logger.error(NAMESPACE, "Create Option error", err);
    res.status(500).json(formatError(err));
  }
};

// Update
export const update = async (req: any, res: any) => {
  try {
    const { id, name, group, serial, status } = req.body;
    const Found = await Option.findById(id);

    if (!Found) {
      return res.status(404).json(formatError("Faq not found"));
    }

    const to_update: any = {
      name,
      group,
      serial,
      status,
    };

    await Option.findByIdAndUpdate(id, to_update);

    res.json({ success: true });
  } catch (err: any) {
    logger.error(NAMESPACE, "Update Option error", err);
    res.status(500).json(formatError("Server error"));
  }
};

export const updates = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const { name, type, serial,status } = req.body;
    const Found = await Option.findById(id);

    if (!Found) {
      return res.status(404).json(formatError("Faq not found"));
    }

    if (name) {
      const to_update: any = {
        name,
        serial,
        type,
        status
      };
      await Option.findByIdAndUpdate(id, to_update);
      const data = await Option.find({ id }).sort({ date: "asc" });

      res.json({ data: data, success: true });
    } else {
      res.json({ success: false, errors: "name can not be empty" });
    }
  } catch (err: any) {
    logger.error(NAMESPACE, "Update  error", err);
    res.status(500).json(formatError("Server error"));
  }
};
// View Single
export const single = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const Found = await Option.findById(id);

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
    const Found = await Option.findById(id);

    if (!Found) {
      return res.status(404).json(formatError("No data found"));
    }

    await Option.findByIdAndDelete(id);

    res.json({ msg: "success" });
  } catch (err: any) {
    logger.error(NAMESPACE, "Delete  error", err);
    res.status(500).json(formatError("Server error"));
  }
};

// Get All
export const getAll = async (req: any, res: Response) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const offset = parseInt(req.query.offset) || 1;
    const search = req.query.search;
    const { user_id } = req.query;

    let count;
    let data;
    if (user_id) {
      count = await Option.count({ merchant_id: user_id });
      data = await Option.find({ merchant_id: user_id })
        .limit(limit * 1)
        .skip((offset - 1) * limit)
        .populate("values");
    } else {
      count = await Option.count({});
      data = await Option.find({})
        .limit(limit * 1)
        .skip((offset - 1) * limit)
        .populate("values");
    }
    if (search) {
      const result: any = data.filter(({ name }: any) =>
        name.toLowerCase().includes(search?.toLowerCase())
      );
      // console.log(result)
      if (result.length > 0) {
        return res.json({ data: result });
      } else {
        return res.json({ data: [] });
      }
    } else {
      return res.json({ data: data, totalCount: count });
    }
  } catch (err: any) {
    logger.error(NAMESPACE, "View all data error", err);
    res.status(500).json(formatError("Server error"));
  }
};

export const createValues = async (req: any, res: any) => {
  try {
    const { id, name, serial } = req.body;
    // const option = await Option.findById(id);
    // console.log("option",option?._id)
    const newOptionValues = new OptionValues({
      name: name,
      serial: serial,
      optionBy: id,
    });
    const value = await newOptionValues.save();
    await Option.updateOne(
      {
        _id: id,
      },
      {
        $push: {
          values: value._id,
        },
      }
    );

    res.json({ success: true, newOptionValues });
  } catch (err: any) {
    logger.error(NAMESPACE, "Create Option error", err);
    res.status(500).json(formatError(err));
  }
};
export const getAllValues = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const Found = await OptionValues.find({ optionBy: id }).populate(
      "optionBy"
    );

    if (!Found) {
      return res.status(404).json(formatError("Not found"));
    }

    res.json({ data: Found });
  } catch (err: any) {
    logger.error(NAMESPACE, "View single data error", err);
    res.status(500).json(formatError("Server error"));
  }
};
export const deleteValues = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const Found = await OptionValues.findById(id);

    if (!Found) {
      return res.status(404).json(formatError("No data found"));
    }

    await OptionValues.findByIdAndDelete(id);

    res.json({ msg: "success" });
  } catch (err: any) {
    logger.error(NAMESPACE, "Delete  error", err);
    res.status(500).json(formatError("Server error"));
  }
};
export const updateValues = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const { name, serial } = req.body;
    const Found = await OptionValues.findById(id);

    if (!Found) {
      return res.status(404).json(formatError("Faq not found"));
    }

    if (name) {
      const to_update: any = {
        name,
        serial,
      };
      await OptionValues.findByIdAndUpdate(id, to_update);
      const data = await OptionValues.find({ id }).sort({ date: "asc" });

      res.json({ data: data, success: true });
    } else {
      res.json({ success: false, errors: "name can not be empty" });
    }
  } catch (err: any) {
    logger.error(NAMESPACE, "Update  error", err);
    res.status(500).json(formatError("Server error"));
  }
};
