

var multer = require('multer');
import logger from '../config/logger';
import AWS from 'aws-sdk';
import fs from 'fs';
import { UploadedFile } from 'express-fileupload';

var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
var path = require('path');

import { mkzID } from './data-formate';

const NAMESPACE = 'Upload Utils';

const endpoint = process.env.AwsEndPoint as string;
const region = process.env.AwsRegion as string;
const key = process.env.AwsAccessKey as string;
const secret = process.env.AwsSecretAccessKey as string;
const bucket = process.env.AwsS3Bucket as string;

const spacesEndpoint = new AWS.Endpoint(endpoint);

// const s3 = new AWS.S3({
//     accessKeyId: key,
//     secretAccessKey: secret,
//     region
//   });
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    region,
    credentials: {
        accessKeyId: key,
        secretAccessKey: secret,
    },
});








// storage used with Multer library to define where to save files on server, and how to save filename
var storage = multer.diskStorage({
    destination: function (req:any, file:any, cb:any) {
        cb(null, __dirname+'/../../public/upload' ) 
    },
    filename: function (req:any, file:any, cb:any) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
            cb(null,   Date.now() + '-' + getExtension(file) );
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

const fields = () =>{

    let array = []
    
    for (let i = 0; i < 15; i++) {

        for (let y = 0; y < 15; y++) {
            let obj :any = {
                name : "product_option_value["+i+"]["+y+"][image]",
                maxCount: 1
            }
            array.push(obj)
        }
        
    }

    array.push(
        { name: "image", maxCount: 1 } ,// in <input name='fileName' />
        { name: "product_image[0][image]", maxCount: 1 } ,// in <input name='fileName' />
        { name: "product_image[1][image]", maxCount: 1 } ,// in <input name='fileName' />
        { name: "product_image[2][image]", maxCount: 1 } ,// in <input name='fileName' />
        { name: "product_image[3][image]", maxCount: 1 } ,// in <input name='fileName' />
        { name: "product_image[4][image]", maxCount: 1 }
    )
    return array
}

export const upload = multer({
    storage: storage,
    // limits: { fileSize: 1048576, files: 1 } // limit file size to 1048576 bytes or 1 MB
    //,fileFilter: // TODO limit types of files. currently can upload a .txt or any kind of file into uploads folder
}).fields( fields() );


//
export const uploadFileToCDN = async (file: any, fileName: string): Promise<string | 'fail' | any> => {
    try {
        const unique_id = mkzID();
        let params: any = { Bucket: bucket, ACL: 'public-read' };
        params.Key = fileName;
        
        params.Body = fs.createReadStream(file[0].path);

        s3.upload(params, (err:any, data:any) => {
            if (err) {
              console.error(err);
              return "fail"
            }

            console.log(`data`,data );
        
            return data
          });

    } catch (err: any) {
        logger.error(NAMESPACE, 'File upload error: ', err);
        return 'fail';
    }
};

export const deleteFileFromCDN = async (fileName: string): Promise<'success' | 'fail'> => {
    try {
        const params = {
            Bucket: bucket,
            Key: fileName,
        };
        await s3.deleteObject(params).promise();
        return 'success';
    } catch (err: any) {
        logger.error(NAMESPACE, 'File upload error: ', err);
        return 'fail';
    }
};









aws.config = {
    accessKeyId: process.env.AwsAccessKey,
    secretAccessKey: process.env.AwsSecretAccessKey,
    region: process.env.AwsRegion,
    signatureVersion: 'v4',
};


var S_3 = new aws.S3();

export const Upload_AWS  = function () {

    const s3Options = {
        bucket: bucket,
        valid: ['.jpg', '.png', '.jpeg'],
        maxSize: 1024 * 1024 * 5,
        pathname: 'profile_picture',
    };

    const _options = s3Options || {};
    return multer({
        storage: multerS3({
            s3: S_3,
            bucket: _options.bucket,
            acl: 'public-read',
            cacheControl: 'max-age=86400',
            serverSideEncryption: 'AES256',
            limits: {fileSize: _options.maxSize},
            // contentType: multerS3.AUTO_CONTENT_TYPE,
            metadata: function (req:any, file:any, callback:any) {
                console.log(`file--`, file);
                callback(null, {
                    fieldName: file.fieldname,
                });
            },
            key: function (req:any, file:any, callback:any) {

                console.log(`file--`, file);
                callback(null, Date.now() + '_' + file.originalname.replace(/\s|[^a-zA-Z ]/g, '') + ".webp");
            },
        }),
        fileFilter: function (req:any, file:any, callback:any) {
            var ext = path.extname(file.originalname);
            var validExtArr = _options.valid;
            if (validExtArr.indexOf(ext) <= -1) {
                return callback(new Error('Only valid file extension allowed!'));
            }
            callback(null, true);
        },
        limits: {
            fileSize: _options.maxSize,
        },
    }).single(_options.pathname);
};