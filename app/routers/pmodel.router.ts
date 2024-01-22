import { Router } from 'express';
const multer = require("multer");
import {
    create,
    delete_,
    getAll,
    single,
    update,
} from '../controllers/pmodel.controller';
import { verifyToken } from '../middlewares/access-control.middleware';
import validateRequest from '../middlewares/error.validation';
import { createPModelSchema, updatePModelSchema } from '../validators/product.validator';
const router = Router();


router.put('/:id', updatePModelSchema, verifyToken, update);
router.post('/create', createPModelSchema, create);
router.get('/list/query', getAll);
router.get('/:id', single);
router.delete('/:id', verifyToken, delete_);

export default router;