import { Request, Response } from "express";
import logger from "../config/logger";
// import { iApiUser } from '../interfaces/auth.interface';
import { Brand } from "../models/Brand.model";
// import values  from '../models/Option.model';
import { formatError } from "../utils/error.util";
const NAMESPACE = "Option Controller";

// Create
export const create = async (req: any, res: any) => {
  try {
    const {
      name,
      description,
      status,
      website,
      merchant_id,
      order,
      feature,
      permalink,
    } = req.body;
    let image;
    if (req?.files?.image != undefined) {
      image = req?.files?.image[0]?.filename;
    }

    const newBrand = new Brand({
      name,
      description,
      status,
      website,
      merchant_id,
      order,
      feature,
      permalink,
      image,
    });

    await newBrand.save();

    res.json({ success: true, newBrand });
  } catch (err: any) {
    logger.error(NAMESPACE, "Create Brand error", err);
    res.status(500).json(formatError(err));
  }
};

// Update
// export const update = async (req: any, res: any) => {
//   try {
//     const { id, name, group, serial } = req.body;
//     const Found = await Option.findById(id);

//     if (!Found) {
//       return res.status(404).json(formatError("Faq not found"));
//     }

//     const to_update: any = {
//       name,
//       group,
//       serial,
//     };

//     await Option.findByIdAndUpdate(id, to_update);

//     res.json({ success: true });
//   } catch (err: any) {
//     logger.error(NAMESPACE, "Update Option error", err);
//     res.status(500).json(formatError("Server error"));
//   }
// };

export const updates = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const { name, description, status, website, order, feature, permalink } =
      req.body;
    const Found = await Brand.findById(id);
    console.log(req.files.image, "rressss");
    let image;
    if (req.files.image != undefined) {
      image = req?.files?.image[0]?.filename;
    }

    if (!Found) {
      return res.status(404).json(formatError(" not found"));
    }

    if (name) {
      const to_update: any = {
        name,
        description,
        status,
        website,
        order,
        feature,
        permalink,
        image,
      };
      await Brand.findByIdAndUpdate(id, to_update);
      const data = await Brand.find({ id }).sort({ date: "asc" });

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
    const Found = await Brand.findById(id);

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
    const Found = await Brand.findById(id);

    if (!Found) {
      return res.status(404).json(formatError("No data found"));
    }

    await Brand.findByIdAndDelete(id);

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
      count = await Brand.count({ merchant_id: user_id });
      data = await Brand.find({ merchant_id: user_id })
        .limit(limit * 1)
        .skip((offset - 1) * limit);
    } else {
      count = await Brand.count({});
      data = await Brand.find({})
        .limit(limit * 1)
        .skip((offset - 1) * limit);
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
export const getpermalinkFromTitle = async (req: Request, res: Response) => {
  const title: string = req.body.title;

  try {
    if (!req.body.title) {
      return res.status(400).json(formatError("Invalid Title"));
    }
    let permalink = title.toLowerCase();
    const permalinks = await Brand.find({ permalink: permalink }).select(
      "permalink"
    );
    console.log("permalinks", permalinks);

    let exist;
    if (permalinks[0]?.permalink) {
      exist = true;
    } else {
      exist = false;
    }

    // if (permalinks.length > 0) {
    //     permalink = `${permalink}-${permalinks.length}`;
    // }

    res.json({ exist });
  } catch (err: any) {
    logger.error(NAMESPACE, "Permalink generation error", err);
    res.status(500).json(formatError("Server Error"));
  }
};
