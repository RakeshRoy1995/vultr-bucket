import { Router } from 'express';
const multer = require("multer");
import {
    create,
    delete_,
    getAll,
    single,
    update,
} from '../controllers/stock.controller';
import { verifyToken } from '../middlewares/access-control.middleware';
import validateRequest from '../middlewares/error.validation';
import { createStockSchema, updateStockSchema } from '../validators/product.validator';
const router = Router();


router.put('/update/:id', updateStockSchema, verifyToken, update);
router.post('/create', createStockSchema, validateRequest, verifyToken, create);
router.get('/list/query', getAll);
router.get('/:id', single);
router.delete('/:id', verifyToken, delete_);

export default router;