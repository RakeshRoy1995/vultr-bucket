import { Router } from 'express';
const multer = require("multer");
import {
    createDistrict,
    deleteDistrict,
    getAllDistrict,
    singleDistrict,
    updateDistrict,
} from '../controllers/district.controller';
import { verifyToken } from '../middlewares/access-control.middleware';
import validateRequest from '../middlewares/error.validation';
import {districtSchema } from '../validators/product.validator';
const router = Router();

var storage = multer.diskStorage({
    destination: function (req:any, file:any, cb:any) {
        cb(null, __dirname+'/../../public/upload' )
    },
    filename: function (req:any, file:any, cb:any) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
            cb(null, Date.now() + "-" + file.originalname );
        }else{
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
        
    }
});

// function getExtension(file:any) {
//     var res = '';
//     if (file.mimetype === 'image/jpeg') res = '.jpg';
//     if (file.mimetype === 'image/png') res = '.png';
//     return res;
// }

var upload = multer({
    storage: storage,
}).fields([ // fields to accept multiple types of uploads
    { name: "banner", maxCount: 1 }, // in <input name='fileName' />
    { name: "logo", maxCount: 1 } // in <input name='fileName' />
]);


// router.put('/', upload,  updateProductSchema,verifyToken,updateDistrict);
router.post('/', upload, districtSchema,verifyToken,createDistrict);
router.get('/', getAllDistrict);
router.get('/:id', singleDistrict);
router.delete('/:id',verifyToken,deleteDistrict);

export default router;