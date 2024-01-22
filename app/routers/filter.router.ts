import { Router } from 'express';
const multer = require("multer");
import {
    create,
    deleteItem,
    getAll,
    single,
    update,
    updates,
    createValues,
    getAllValues,
    deleteValues,
    updateValues,
} from '../controllers/filter.controller';
import { verifyToken } from '../middlewares/access-control.middleware';
import validateRequest from '../middlewares/error.validation';
import { createFilterSchema,updateFilterSchema,updateValuesSchema, createValuesSchema } from '../validators/filter.validator';
const router = Router();


// storage used with Multer library to define where to save files on server, and how to save filename
var storage = multer.diskStorage({
    destination: function (req:any, file:any, cb:any) {
        cb(null, __dirname+'/../uploads' )
    },
    filename: function (req:any, file:any, cb:any) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
            cb(null,  file.originalname + '-' + Date.now() + '-' + getExtension(file) );
        }else{
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
        
    }
});

function getExtension(file:any) {
    var res = '';
    if (file.mimetype === 'image/jpeg') res = '.jpg';
    if (file.mimetype === 'image/png') res = '.png';
    return res;
}

var upload = multer({
    storage: storage,
    // limits: { fileSize: 1048576, files: 1 } // limit file size to 1048576 bytes or 1 MB
    //,fileFilter: // TODO limit types of files. currently can upload a .txt or any kind of file into uploads folder
}).fields([ // fields to accept multiple types of uploads
    { name: "image", maxCount: 1 } // in <input name='fileName' />
]);




router.put('/update',  update);
router.put('/:id',updateFilterSchema,validateRequest,  updates);
router.put('/updatevalues/:id',updateValuesSchema,validateRequest,  updateValues);
//upload, updateFaqSchema,verifyToken,
router.post('/create',createFilterSchema,validateRequest,create);
router.post('/createvalues',createValuesSchema,validateRequest,createValues);
//upload, updateFaqSchema,verifyToken,
// router.get('/list/query', getAllFaq);
router.get('/list/query', getAll);
router.get('/:id', single);
router.get('/getvalues/:id', getAllValues);
router.delete('/:id',deleteItem);
router.delete('/deletevalues/:id',deleteValues);

// verifyToken,

export default router;