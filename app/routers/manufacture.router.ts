import { Router } from 'express';
const multer = require("multer");
import {
    create,
    delete_,
    getAll,
    single,
    update,
} from '../controllers/manufacture.controller';
import { verifyToken } from '../middlewares/access-control.middleware';
import validateRequest from '../middlewares/error.validation';
import { updateManufactureSchema, createManufactureSchema } from '../validators/product.validator';
const router = Router();


router.put('/update/:id', updateManufactureSchema, verifyToken, update);
router.post('/create', createManufactureSchema, validateRequest, verifyToken, create);
router.get('/list/query', getAll);
router.get('/:id', single);
router.delete('/:id', verifyToken, delete_);

export default router;