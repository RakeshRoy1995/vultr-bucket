import { Request, Response } from 'express';
import logger from '../config/logger';
import Stock from '../models/Stock.model';
import ModalData from '../models/Stock.model';
import { formatError } from '../utils/error.util';
const NAMESPACE = 'Stock Controller';


// Create Stock-Status
export const create = async (req: Request, res: Response) => {
    try {
        const { name, status, merchant_id } = req.body;
        const data = new ModalData({ name, status, merchant_id });
        await data.save();
        res.json({ success: true, data });
    } catch (err: any) {
        logger.error(NAMESPACE, 'Create error', err);
        res.status(500).json(formatError(err));
    }
};

// Update Stock
export const update = async (req: any, res: any) => {


    try {
        const { id } = req.params;

        const { name, status, merchant_id } = req.body;
        const Found = await Stock.findById(id);

        if (!Found) {
            return res.status(404).json(formatError('Stock not found'));
        }

        const to_update: any = {
            name, status, merchant_id

        };



        const data = await Stock.findByIdAndUpdate(id, to_update);
        const messege = "updated successfully"

        res.json({ data: data, payload: messege });
    } catch (err: any) {
        logger.error(NAMESPACE, 'Update  error', err);
        res.status(500).json(formatError('Server error'));
    }
};

// View Single Stock
export const single = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const stockFound = await Stock.findById(id);

        if (!stockFound) {
            return res.status(404).json(formatError('No Stock found'));
        }

        res.json({ data: stockFound });
    } catch (err: any) {
        logger.error(NAMESPACE, 'View single stock error', err);
        res.status(500).json(formatError('Server error'));
    }
};

// delete Single Stock
export const delete_ = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const stockFound = await Stock.findById(id);

        if (!stockFound) {
            return res.status(404).json(formatError('No Stock found'));
        }

        await Stock.findByIdAndDelete(id);

        res.json({ msg: 'success' });
    } catch (err: any) {
        logger.error(NAMESPACE, 'View single Stock error', err);
        res.status(500).json(formatError('Server error'));
    }
};

// // Get All Products
export const getAll = async (req: any, res: Response) => {
    try {
        const items_per_page = parseInt(req.query.items_per_page) || 0;
        const page = parseInt(req.query.page) || 1;
        const search = req.query.search;
        const user_id = req.query.user_id;
        let count;
        let data;
        if (user_id) {
            count = await Stock.count({ merchant_id: user_id });
            data = await Stock.find({ merchant_id: user_id })
                .limit(items_per_page * 1)
                .skip((page - 1) * items_per_page);
        } else {
            count = await Stock.count({});
            data = await Stock.find({})
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
//             const data = await Stock.find({ merchant_id: user_id }).sort({ order: 'asc' });

//             if (data.length > 0) {
//                 return res.json({ data })

//             } else {
//                 return res.json({ data: [] });
//             }
//         }
//         const data = await Stock.find({}).sort({ date: 'asc' });
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
