import { Request, Response } from 'express';
import logger from '../config/logger';
import { formatError } from '../utils/error.util';
import PModel from '../models/PModel.model';
const NAMESPACE = 'Product model Controller';


// Create 
export const create = async (req: any, res: any) => {
    try {

        const { name, status, merchant_id } = req.body;
        const newPModel = new PModel({ name, status, merchant_id },);
        await newPModel.save();

        res.json({ success: true, newPModel });
    } catch (err: any) {
        logger.error(NAMESPACE, 'Create PModel error', err);
        res.status(500).json(formatError(err));
    }
};
// Update 
export const update = async (req: any, res: any) => {


    try {
        const { id } = req.params;

        const { name, status, merchant_id } = req.body;
        const Found = await PModel.findById(id);

        if (!Found) {
            return res.status(404).json(formatError('Model not found'));
        }

        const to_update: any = {
            name, status, merchant_id

        };



        const data = await PModel.findByIdAndUpdate(id, to_update);
        const messege = "updated successfully"

        res.json({ data: data, payload: messege });
    } catch (err: any) {
        logger.error(NAMESPACE, 'Update  error', err);
        res.status(500).json(formatError('Server error'));
    }
};

// View Single
export const single = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const pmodelFound = await PModel.findById(id);

        if (!pmodelFound) {
            return res.status(404).json(formatError('No Model found'));
        }

        res.json({ data: pmodelFound });
    } catch (err: any) {
        logger.error(NAMESPACE, 'View single pmodel error', err);
        res.status(500).json(formatError('Server error'));
    }
};

// delete Single 
export const delete_ = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const pmodelFound = await PModel.findById(id);

        if (!pmodelFound) {
            return res.status(404).json(formatError('No Model found'));
        }

        await PModel.findByIdAndDelete(id);

        res.json({ msg: 'success' });
    } catch (err: any) {
        logger.error(NAMESPACE, 'View single Stock error', err);
        res.status(500).json(formatError('Server error'));
    }
};

// // Get All
export const getAll = async (req: any, res: Response) => {
    try {

        const { user_id } = req.query
        if (user_id) {
            const data = await PModel.find({ merchant_id: user_id }).sort({ order: 'asc' });

            if (data.length > 0) {
                return res.json({ data })

            } else {
                return res.json({ data: [] });
            }
        }
        const data = await PModel.find({}).sort({ date: 'asc' });
        const { search } = req.query;
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
            return res.json({ data: data });
        }
    }

    catch (err: any) {
        logger.error(NAMESPACE, 'View all data error', err);
        res.status(500).json(formatError('Server error'));
    }
};
