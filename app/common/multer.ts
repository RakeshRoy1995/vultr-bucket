import { mkzID } from "./data-formate";
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const endpoint = process.env.vultrEndPoint as string;
const key = process.env.vultrAccessKey as string;
const secret = process.env.vultrSecretAccessKey as string;
const bucket = process.env.vultrS3Bucket as string;

// Set S3 endpoint to Vultr Object Storage
const spacesEndpoint = new aws.Endpoint(endpoint);
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: key,
  secretAccessKey: secret,
});

const fields = () => {
  let array = [];

  for (let i = 0; i < 15; i++) {
    for (let y = 0; y < 15; y++) {
      let obj: any = {
        name: "product_option_value[" + i + "][" + y + "][image]",
        maxCount: 1,
      };
      array.push(obj);
    }
  }

  array.push(
    { name: "image", maxCount: 1 }, // in <input name='fileName' />
    { name: "product_image[0][image]", maxCount: 1 }, // in <input name='fileName' />
    { name: "product_image[1][image]", maxCount: 1 }, // in <input name='fileName' />
    { name: "product_image[2][image]", maxCount: 1 }, // in <input name='fileName' />
    { name: "product_image[3][image]", maxCount: 1 }, // in <input name='fileName' />
    { name: "product_image[4][image]", maxCount: 1 }
  );
  return array;
};

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    acl: "public-read",
    key: function (request: any, file: any, cb: any) {
      cb(null, mkzID(5) + file.originalname);
    },
  }),
}).fields(fields());


export const fileRenameAndUpload = (req: any) => {
  return req.key;
};