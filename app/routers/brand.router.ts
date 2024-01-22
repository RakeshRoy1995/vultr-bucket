import { Router } from 'express';
const multer = require("multer");
import {
    create,
    deleteItem,
    getAll,
    single,
    updates,
    getpermalinkFromTitle,
} from '../controllers/brand.controller';
import { verifyToken } from '../middlewares/access-control.middleware';
import validateRequest from '../middlewares/error.validation';
import { createBrandSchema } from '../validators/brand.validator';
const router = Router();

import { upload } from '../common/multer';




router.put('/:id',upload,createBrandSchema,validateRequest,  updates);
router.post('/permalink',  getpermalinkFromTitle);
//upload, updateFaqSchema,verifyToken,
router.post('/create', upload ,createBrandSchema,create);
//upload, updateFaqSchema,verifyToken,
// router.get('/list/query', getAllFaq);
router.get('/list/query', getAll);
router.get('/:id', single);
router.delete('/:id',deleteItem);

// verifyToken,

export default router;