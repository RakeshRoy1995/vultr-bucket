import { Router } from 'express'

import {
   
    upload_image
} from '../controllers/product.controller';
import { upload } from '../common/multer';

const router = Router();

router.put('/update-image', upload ,upload_image)


export default router;