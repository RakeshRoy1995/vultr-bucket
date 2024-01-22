import { Request, Response } from "express";
import logger from "../config/logger";
// import { iApiUser } from '../interfaces/auth.interface';
import { Filter, Filtervalues } from "../models/Filter.model";
// import values  from '../models/Filter.model';
import { formatError } from "../utils/error.util";
const NAMESPACE = "Filter Controller";

// Create FAQ
export const create = async (req: any, res: any) => {
  try {
    const { name, status, serial, merchant_id ,type} = req.body;
    const newFilter = new Filter({ name, status, serial, merchant_id,type });
    await newFilter.save();

    res.json({ success: true, newFilter });
  } catch (err: any) {
    logger.error(NAMESPACE, "Create Filter error", err);
    res.status(500).json(formatError(err));
  }
};

// Update FAQ
export const update = async (req: any, res: any) => {
  try {
    const { id, name, group, serial, status } = req.body;
    const Found = await Filter.findById(id);

    if (!Found) {
      return res.status(404).json(formatError("Faq not found"));
    }

    const to_update: any = {
      name,
      group,
      serial,
      status,
    };

    await Filter.findByIdAndUpdate(id, to_update);

    res.json({ success: true });
  } catch (err: any) {
    logger.error(NAMESPACE, "Update Filter error", err);
    res.status(500).json(formatError("Server error"));
  }
};

export const updates = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const { name, status, serial,type } = req.body;
    const Found = await Filter.findById(id);

    if (!Found) {
      return res.status(404).json(formatError("Faq not found"));
    }

    if (name) {
      const to_update: any = {
        name,
        serial,
        status,
        type,
      };
      await Filter.findByIdAndUpdate(id, to_update);
      const data = await Filter.find({ id }).sort({ date: "asc" });

      res.json({ data: data, success: true });
    } else {
      res.json({ success: false, errors: "name can not be empty" });
    }
  } catch (err: any) {
    logger.error(NAMESPACE, "Update  error", err);
    res.status(500).json(formatError("Server error"));
  }
};
// View Single FAQ
export const single = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const Found = await Filter.findById(id);

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
    const Found = await Filter.findById(id);

    if (!Found) {
      return res.status(404).json(formatError("No data found"));
    }

    await Filter.findByIdAndDelete(id);

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
      count = await Filter.count({ merchant_id: user_id });
      data = await Filter.find({ merchant_id: user_id })
        .limit(limit * 1)
        .skip((offset - 1) * limit)
        .populate("values");
    } else {
      count = await Filter.count({});
      data = await Filter.find({})
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

    const newFilterValues = new Filtervalues({
      name: name,
      serial: serial,
      filterBy: id,
    });
    const value = await newFilterValues.save();
    await Filter.updateOne(
      {
        _id: id,
      },
      {
        $push: {
          values: value._id,
        },
      }
    );

    res.json({ success: true, newFilterValues });
  } catch (err: any) {
    logger.error(NAMESPACE, "Create Filter error", err);
    res.status(500).json(formatError(err));
  }
};
export const getAllValues = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const Found = await Filtervalues.find({ filterBy: id });

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
    const Found = await Filtervalues.findById(id);

    if (!Found) {
      return res.status(404).json(formatError("No data found"));
    }

    await Filtervalues.findByIdAndDelete(id);

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
    const Found = await Filtervalues.findById(id);

    if (!Found) {
      return res.status(404).json(formatError("Faq not found"));
    }
    if (name) {
      const to_update: any = {
        name,
        serial,
      };
      await Filtervalues.findByIdAndUpdate(id, to_update);
      const data = await Filtervalues.find({ id }).sort({ date: "asc" });

      res.json({ data: data, success: true });
    } else {
      res.json({ success: false, errors: "name can not be empty" });
    }
  } catch (err: any) {
    logger.error(NAMESPACE, "Update  error", err);
    res.status(500).json(formatError("Server error"));
  }
};
