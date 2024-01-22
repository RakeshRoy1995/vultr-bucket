import { Request, Response } from "express";
import fs from "fs";
import logger from "../config/logger";
import General_categorie from "../models/General_categorie.model";
import { formatError, formatSuccess } from "../utils/error.util";
import { fileRenameAndUpload } from "../common/multer";
import adminCategory from "../models/admin_category.model";
import { Product } from "../models/Product.model";
const NAMESPACE = "Customer_categorie Controller";

// Create Product_categoire
export const createGeneral_categorie = async (req: any, res: any) => {
  try {
    const { id, merchant_id, status, store_id } = req.body;

    let category: any = await adminCategory.findById(id);
    if (!category) {
      return res.status(500).json(formatError("No Categorie found"));
    }

    category = category.toObject();
    delete category['_id']

    const check_exist_same_store = await General_categorie.findOne({
      name: category.name,
      store_id: store_id,
      admin_category: id,
    });
    
    //add new category
    if (!check_exist_same_store && status) {
      const newGeneral_categoire = new General_categorie({
        ...category,
        admin_category: id,
        merchant_id,
        store_id,
      });

      await newGeneral_categoire.save();

      //Insert all child category
      let cat_child = newGeneral_categoire?.child || [];

      for (let index = 0; index < cat_child.length; index++) {
        const id = cat_child[index];
        let category: any = await adminCategory.findById(id);

        const check_exist_same_store = await General_categorie.findOne({
          name: category.name,
          store_id: store_id,
          admin_category: id,
        });

        if (!check_exist_same_store && status) {
          category = category.toObject();
          delete category['_id']
          const newGeneral_categoire = new General_categorie({
            ...category,
            admin_category: id,
            merchant_id,
            store_id,
          });
          await newGeneral_categoire.save();

          let cat_child = newGeneral_categoire?.child || [];

          for (let index = 0; index < cat_child.length; index++) {
            const id = cat_child[index];
            let category: any = await adminCategory.findById(id);

            const check_exist_same_store = await General_categorie.findOne({
              name: category.name,
              store_id: store_id,
              admin_category: id,
            });

            if (!check_exist_same_store && status) {
              category = category.toObject();
              delete category['_id']
              const newGeneral_categoire = new General_categorie({
                ...category,
                admin_category: id,
                merchant_id,
                store_id,
              });
              await newGeneral_categoire.save();
            }
          }
        }
      }
    }

    //remove category

    if (check_exist_same_store && !status) {
      await General_categorie.deleteOne({admin_category : id});
    }

    res.json({ success: true, data: category });
  } catch (err: any) {
    logger.error(NAMESPACE, "Create Product Categorie error", err);
    res.status(500).json(formatError(err));
  }
};

// Update General Categorie

export const updateGeneral_categorie = async (req: any, res: any) => {
  try {
    let {
      name,
      description,
      metatag,
      metadescription,
      metakeyword,
      parent,
      status,
      store_id,
    } = req.body;

    let image = req?.files?.image
      ? await fileRenameAndUpload(req?.files?.image[0])
      : undefined;

    const { _id } = req.params;
    const general_categorieFound: any = await General_categorie.findById(_id);

    if (!general_categorieFound) {
      return res.status(404).json(formatError("Categorie not found"));
    }
    // remove all the parent category
    let allCat: any = await General_categorie.aggregate([
      {
        $match: {
          child: { $in: [_id] },
        },
      },
    ]);

    for (let index = 0; index < allCat.length; index++) {
      const element = allCat[index];
      let child = element.child.filter((element: any) => element != _id);
      element.child = child;
      await General_categorie.findByIdAndUpdate(element._id, element);
    }

    if (parent === _id) {
      parent = "";
    }

    const to_update: any = {
      name,
      description,
      metatag,
      metadescription,
      metakeyword,
      parent,
      status,
      store_id,
      image,
    };

    const data: any = await General_categorie.findByIdAndUpdate(
      _id,
      to_update,
      {
        new: true,
      }
    );

    if (parent) {
      // if parent exist , entry it to parent child
      let parent_categorieFound: any = await General_categorie.findById(parent);
      let child = [];
      child = parent_categorieFound.child;
      if (!child.includes(_id)) {
        child.push(_id);
      }
      parent_categorieFound = parent_categorieFound.toObject();
      let updateParent = {
        ...parent_categorieFound,
        ["child"]: child,
      };

      await General_categorie.findByIdAndUpdate(parent, updateParent);
    }

    res.json(formatSuccess(data));
  } catch (err: any) {
    logger.error(NAMESPACE, "Update Categorie error", err);
    res.status(500).json(formatError("Server error"));
  }
};

// View Single Categorie
export const singleGeneral_categorie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.query.user;

    if (user) {
      const general_categorieFound = await adminCategory.findById(id);
      if (!general_categorieFound) {
        return res.status(500).json(formatError("No Categorie found"));
      }
      return res.json({ data: general_categorieFound });
    } else {
      const general_categorieFound = await General_categorie.findById(id);
      if (!general_categorieFound) {
        return res.status(500).json(formatError("No Categorie found"));
      }
      return res.json({ data: general_categorieFound });
    }
  } catch (err: any) {
    logger.error(NAMESPACE, "View single categorie error", err);
    res.status(500).json(formatError("Server error"));
  }
};

// delete Single Categorie
export const deleteGeneral_categorie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const general_categorieFound :any = await General_categorie.findById(id);
    const product = await Product.find({store_id : general_categorieFound.store_id });

    if (!general_categorieFound) {
      return res.status(404).json(formatError("No Categorie found"));
    }

    if (product.length > 0) {
      return res.status(500).json(formatError("This category is used to a product"));
    }

    await General_categorie.findByIdAndDelete(id);
    res.json({ msg: "success" });
  } catch (err: any) {
    logger.error(NAMESPACE, "View single categorie error", err);
    res.status(500).json(formatError("Server error"));
  }
};
export const getAllGeneral_categorie = async (req: any, res: Response) => {
  try {
    const items_per_page = parseInt(req.query.items_per_page) || 0;
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search;
    const user_id = req.query.user_id;
    const store_id = req.query.store_id;
    const user = req.query.user;
    let count;
    let data;

    if (user) {
      // get admin category

      count = await adminCategory.count({});
      data = await adminCategory
        .find({})
        .limit(items_per_page * 1)
        .skip((page - 1) * items_per_page);
      return res.json({ data: data, totalCount: count });
    } else {
      if (store_id) {
        count = await General_categorie.count({ store_id });
        data = await General_categorie.find({ store_id })
          .limit(items_per_page * 1)
          .skip((page - 1) * items_per_page);
        return res.json({ data: data, totalCount: count });
      } else {
        if (user_id) {
          count = await General_categorie.count({ merchant_id: user_id });
          data = await General_categorie.find({ merchant_id: user_id })
            .limit(items_per_page * 1)
            .skip((page - 1) * items_per_page)
            .populate("store_id");
        } else {
          count = await General_categorie.count({});
          data = await General_categorie.find({})
            .limit(items_per_page * 1)
            .skip((page - 1) * items_per_page)
            .populate("store_id");
        }
        if (search) {
          const result: any = data.filter(({ name }: any) =>
            name.toLowerCase().includes(search?.toLowerCase())
          );
          // console.log(result)
          if (result.length > 0) {
            return res.json({ data: result, totalCount: count });
          } else {
            return res.json({ data: [] });
          }
        } else {
          return res.json({ data: data, totalCount: count });
        }
      }
    }
  } catch (err: any) {
    logger.error(NAMESPACE, "View all data error", err);
    res.status(500).json(formatError("Server error"));
  }
};

export const createAdmin_categorie = async (req: any, res: any) => {
  try {
    const {
      name,
      description,
      metatag,
      metadescription,
      metakeyword,
      parent,
      status,
      seo_store,
      design_store,
    } = req.body;

    let parent_ids = "";
    let parent_names = "";

    let id = parent.split("--")[0];

    if (parent) {
      let parent_name = parent.split("--")[1];
      let parent_id = parent.split("--")[2];
      let name = parent.split("--")[3];
      parent_ids += parent_id ? parent_id + "," + id : id;
      parent_names += parent_id ? parent_name + "," + name : name;
    }

    let image = await fileRenameAndUpload(req?.files?.image[0]);

    const newGeneral_categoire = new adminCategory({
      parent_ids,
      parent_names,
      name,
      description,
      metatag,
      metadescription,
      metakeyword,
      parent: id,
      status,
      seo_store,
      design_store,
      image,
    });

    const saved = await newGeneral_categoire.save();
    res.json({ success: true, data: saved });
  } catch (err: any) {
    logger.error(NAMESPACE, "Create Product Categorie error", err);
    res.status(500).json(formatError(err));
  }
};

export const updateAdmin_categorie = async (req: any, res: any) => {
  try {
    let {
      name,
      description,
      metatag,
      metadescription,
      metakeyword,
      parent,
      status,
      store_id,
    } = req.body;

    let image = req?.files?.image
      ? await fileRenameAndUpload(req?.files?.image[0])
      : undefined;

    const { _id } = req.params;
    const general_categorieFound: any = await adminCategory.findById(_id);

    if (!general_categorieFound) {
      return res.status(404).json(formatError("Categorie not found"));
    }
    // remove all the parent category
    let allCat: any = await adminCategory.aggregate([
      {
        $match: {
          child: { $in: [_id] },
        },
      },
    ]);

    for (let index = 0; index < allCat.length; index++) {
      const element = allCat[index];
      let child = element.child.filter((element: any) => element != _id);
      element.child = child;
      

      await adminCategory.findByIdAndUpdate(element._id, element);
      // await General_categorie.update({admin_category : element._id}, element);
    }

    if (parent === _id) {
      parent = "";
    }

    const to_update: any = {
      name,
      description,
      metatag,
      metadescription,
      metakeyword,
      parent,
      status,
      store_id,
      image,
    };

    const data: any = await adminCategory.findByIdAndUpdate(_id, to_update, {
      new: true,
    });

    await General_categorie.updateMany({admin_category : _id}, to_update);

    if (parent) {
      // if parent exist , entry it to parent child
      let parent_categorieFound: any = await adminCategory.findById(parent);
      let child = [];
      child = parent_categorieFound.child;
      if (!child.includes(_id)) {
        child.push(_id);
      }
      parent_categorieFound = parent_categorieFound.toObject();
      let updateParent = {
        ...parent_categorieFound,
        ["child"]: child,
      };

      await adminCategory.findByIdAndUpdate(parent, updateParent);
    // await General_categorie.updateMany({admin_category : parent}, updateParent);

    }

    res.json(formatSuccess(data));
  } catch (err: any) {
    logger.error(NAMESPACE, "Update Categorie error", err);
    res.status(500).json(formatError("Server error"));
  }
};

export const deleteAdmin_categorie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const general_categorieFound = await adminCategory.findById(id);

    if (!general_categorieFound) {
      return res.status(500).json(formatError("No Categorie found"));
    }

    await adminCategory.findByIdAndDelete(id);
    await General_categorie.deleteMany({admin_category : id});

    res.json({ msg: "success" });
  } catch (err: any) {
    logger.error(NAMESPACE, "View single categorie error", err);
    res.status(500).json(formatError("Server error"));
  }
};
