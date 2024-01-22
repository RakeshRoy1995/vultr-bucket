import { Request, Response } from 'express';
import logger from '../config/logger';
import { iApiUser } from '../interfaces/auth.interface';
import District from '../models/District.model';
import { formatError, makeURL } from '../utils/error.util';
const NAMESPACE = 'District Controller';


// Create Categories
export const createDistrict = async (req: any, res: any) => {
    try {
        const inputs :any = {}
        const { name, name_local} = req.body;
        let slug , local_slug

        if (name) {
            slug = makeURL(name);
        }
        if (name_local) {
            local_slug = makeURL(name_local);
        }

        const data = new District({ name, name_local, slug , local_slug,  banner : req?.files?.banner[0].filename , logo : req?.files?.logo[0].filename });
        await data.save();

        res.json({ success: true , data });
    } catch (err: any) {
        logger.error(NAMESPACE, 'Create District error', err);

        if (err?.index === 0 ) {
            res.status(500).json(formatError('Name , Local Name is unique'));
        } else {
            res.status(500).json(formatError("Something went wrong"));
        }
        
    }
};

// Update District
export const updateDistrict = async (req: any, res: any) => {
    

    try {
        const { id , name, description , price , status } = req.body;
        const categorieFound = await District.findById(id);

        if (!categorieFound) {
            return res.status(404).json(formatError('District not found'));
        }

        const to_update: any = {
            name,
            description,
            price,
            status,
            
        };

        console.log("req?.files" , req?.files , req.body);
        

        if (req?.files?.image) {
            to_update.image = req?.files?.image[0].filename
        }

        await District.findByIdAndUpdate(id, to_update);

        res.json({ success: true });
    } catch (err: any) {
        logger.error(NAMESPACE, 'Update District error', err);
        res.status(500).json(formatError('Server error'));
    }
};

// View Single District
export const singleDistrict = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const DistrictFound = await District.findById(id);

        if (!DistrictFound) {
            return res.status(404).json(formatError('No District found'));
        }

        res.json(DistrictFound);
    } catch (err: any) {
        logger.error(NAMESPACE, 'View single categorie error', err);
        res.status(500).json(formatError('Server error'));
    }
};

// delete Single District
export const deleteDistrict = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const categorieFound = await District.findById(id);

        if (!categorieFound) {
            return res.status(404).json(formatError('No District found'));
        }

        await District.findByIdAndDelete(id);

        res.json({ msg: 'success' });
    } catch (err: any) {
        logger.error(NAMESPACE, 'View single categorie error', err);
        res.status(500).json(formatError('Server error'));
    }
};

// Get All Districts
export const getAllDistrict = async (req: Request, res: Response) => {
    try {
        const published = req.query.published;

        if (published === 'true') {
            const today = new Date().toISOString();
            const data = await District.find({ publish: true }).sort({ date: 'asc' });
            return res.json(data);
        } else {
            const data = await District.find({}).sort({ date: 'asc' });
            return res.json(data);
        }
    } catch (err: any) {
        logger.error(NAMESPACE, 'View all data error', err);
        res.status(500).json(formatError('Server error'));
    }
};
