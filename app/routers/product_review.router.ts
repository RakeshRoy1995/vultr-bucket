import { Router } from 'express';
const multer = require("multer");
import {
    review,
} from '../controllers/product_review.controller';
import { verifyToken } from '../middlewares/access-control.middleware';
import validateRequest from '../middlewares/error.validation';
import { createFilterSchema,updateFilterSchema,updateValuesSchema, createValuesSchema } from '../validators/filter.validator';
const router = Router();

import { upload } from '../common/multer';


router.post('/create',upload,review);

// verifyToken,

export default router;