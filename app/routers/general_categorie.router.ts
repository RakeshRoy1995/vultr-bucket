import { Router } from 'express';
const multer = require("multer");
import {
    createAdmin_categorie,
    createGeneral_categorie,
    deleteAdmin_categorie,
    deleteGeneral_categorie,
    getAllGeneral_categorie,
    singleGeneral_categorie,
    updateAdmin_categorie,
    updateGeneral_categorie,
} from '../controllers/general_categorie.controller';
import { verifyToken } from '../middlewares/access-control.middleware';
import validateRequest from '../middlewares/error.validation';
import { loginSchema, createGeneral_categorieSchema, updateGeneral_categorieSchema } from '../validators/product.validator';
import { upload } from '../common/multer';
const router = Router();



router.put('/update/:_id', verifyToken, upload, updateGeneral_categorie);
router.put('/update-admin-category/:_id', verifyToken, upload, updateAdmin_categorie);
router.post('/create', verifyToken ,  createGeneral_categorie);
router.post('/create-admin-category', verifyToken , upload,  createAdmin_categorie);
router.get('/list', getAllGeneral_categorie);
router.get('/:id', singleGeneral_categorie);
router.delete('/:id', verifyToken, deleteGeneral_categorie);
router.delete('/admin-category/:id', verifyToken, deleteAdmin_categorie);


export default router;