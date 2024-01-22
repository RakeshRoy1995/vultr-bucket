import { Request, Response } from 'express';
import logger from '../config/logger';
import Manufacture from '../models/manufacture.model';
import { formatError } from '../utils/error.util';
const NAMESPACE = 'Product Controller';


// Create Categories
export const create = async (req: Request, res: Response) => {
    try {
        const { name, serial_number, image, seo, status, merchant_id } = req.body;
        const data = new Manufacture({ name, serial_number, image, seo, status, merchant_id });
        await data.save();
        res.json({ success: true, data });
    } catch (err: any) {
        logger.error(NAMESPACE, 'Create error', err);
        res.status(500).json(formatError(err));
    }
};

// Update Manufacturer
export const update = async (req: any, res: any) => {


    try {
        const { id } = req.params;

        const { name, serial_number, image, seo, status, merchant_id } = req.body;
        const Found = await Manufacture.findById(id);

        if (!Found) {
            return res.status(404).json(formatError('Manufacture not found'));
        }

        const to_update: any = {
            name, serial_number, image, seo, status, merchant_id

        };



        const data = await Manufacture.findByIdAndUpdate(id, to_update);
        const messege = "updated successfully"

        res.json({ data: data, payload: messege });
    } catch (err: any) {
        logger.error(NAMESPACE, 'Update  error', err);
        res.status(500).json(formatError('Server error'));
    }
};

// View Single Manufacture
export const single = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const manufactureFound = await Manufacture.findById(id);

        if (!manufactureFound) {
            return res.status(404).json(formatError('No Manufacture found'));
        }

        res.json({ data: manufactureFound });
    } catch (err: any) {
        logger.error(NAMESPACE, 'View single manufacture error', err);
        res.status(500).json(formatError('Server error'));
    }
};

// delete Single Manufacture
export const delete_ = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const manufactureFound = await Manufacture.findById(id);

        if (!manufactureFound) {
            return res.status(404).json(formatError('No Manufacture found'));
        }

        await Manufacture.findByIdAndDelete(id);

        res.json({ msg: 'success' });
    } catch (err: any) {
        logger.error(NAMESPACE, 'View single manufacture error', err);
        res.status(500).json(formatError('Server error'));
    }
};

// // Get All Manufactures
export const getAll = async (req: any, res: Response) => {
    try {
        const items_per_page = parseInt(req.query.items_per_page) || 0;
        const page = parseInt(req.query.page) || 1;
        const search = req.query.search;
        const user_id = req.query.user_id;
        let count;
        let data;
        if (user_id) {
            count = await Manufacture.count({ merchant_id: user_id });
            data = await Manufacture.find({ merchant_id: user_id })
                .limit(items_per_page * 1)
                .skip((page - 1) * items_per_page);
        } else {
            count = await Manufacture.count({});
            data = await Manufacture.find({})
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
                name.toLowerCase().includes(search?.toLowerCase())
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
// export const getAll = async (req: any, res: Response) => {
//     try {
//         const { user_id } = req.query
//         if (user_id) {
//             const data = await Manufacture.find({ merchant_id: user_id }).sort({ order: 'asc' });

//             if (data.length > 0) {
//                 return res.json({ data })

//             } else {
//                 return res.json({ data: [] });
//             }
//         }


//         const data = await Manufacture.find({}).sort({ date: 'asc' });
//         const { search } = req.query;
//         if (search) {

//             const result: any = data.filter(({ name }: any) =>
//                 name.toLowerCase().includes(search.toLowerCase())
//             );
//             // console.log(result)
//             if (result.length > 0) {
//                 return res.json({ data: result });

//             } else {
//                 return res.json({ data: [] });
//             }
//         } else {
//             return res.json({ data: data });
//         }
//     }

//     catch (err: any) {
//         logger.error(NAMESPACE, 'View all data error', err);
//         res.status(500).json(formatError('Server error'));
//     }
// };