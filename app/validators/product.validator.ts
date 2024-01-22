import { body } from 'express-validator';

export const loginSchema = [
    body('email', 'Email is required').isString().isEmail(),
    body('password', 'password is required').isString().isLength({ min: 6 }),
]

export const productSchema = [
    body('name', 'name is required').isString().isString(),
    body('meta_title', 'meta title is required').isString(),
    body('model', 'model is required').isString(),
    body('image', 'Image is required').isString(),
]

export const manufactureSchema = [
    body('name', 'Name is required').isString(),
]

export const stockSchema = [
    body('name', 'Name is required').isString(),
]

export const updateProductSchema = [
    body('name', 'Product name is required').isString(),
    body('price', 'Price is required').isString(),
    body('description', 'Description is required').isString(),
];


export const districtSchema = [
    body('name', 'name is required').isString(),
    body('name_local', 'Local name is required').isString(),
    body('logo', 'Logo name is required').isString(),
    body('banner', 'Banner name is required').isString(),
]

export const createGeneral_categorieSchema = [
    body('name', 'Category Title is required').isString(),
    body('description', 'Category Description is required').isString(), 
];

export const updateGeneral_categorieSchema = [
    body('name', 'General Categorie Title is required').isString(),
    body('description', 'General Categorie Description is required').isString(),
];

export const createManufactureSchema = [
    body('name', 'General Manufacture Title is required').isString(),
    body('serial_number', 'Manufacture MetaKeyword is required').isString(),
    body('seo', 'Manufacture seo  is required').isString(),

];

export const updateManufactureSchema = [
    body('name', 'Manufacture Title is required').isString(),
    body('serial_number', 'Manufactureserial_number is required').isString(),
    body('seo', 'Manufacture seo is required').isString(),
    body('status', 'ManufactureMeta status is required').isString(),

];

export const createStockSchema = [
    body('name', 'Stock-Status Title is required').isString(),
];

export const updateStockSchema = [
    body('name', 'Stock-Status Title is required').isString(),
];

export const createPModelSchema = [
    body('name', 'P Model Title is required').isString(),
    body('status', 'General Categorie Title is required').isString(),

];

export const updatePModelSchema = [
    body('name', 'P Model Title is required').isString(),
];