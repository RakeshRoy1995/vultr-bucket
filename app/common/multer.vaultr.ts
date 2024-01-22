import { mkzID } from "./data-formate";
const aws = require('aws-sdk');
const multer = require("multer");
const multerS3 = require('multer-s3');

// Set S3 endpoint to Vultr Object Storage
const spacesEndpoint = new aws.Endpoint('sgp1.vultrobjects.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: "26BV3C7CSHPJIHHL4QUB",
    secretAccessKey: "Im9zfJm7B4pG9etg2OKKVkexohHrbMVQNNnfDpjb"
});

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
  storage: multerS3({
    s3: s3,
    bucket: 'ekshop-com-bd-v3',
    acl: 'public-read',
    key: function (request:any, file:any, cb:any) {
      console.log(file);
      cb(null, mkzID(5) + file.originalname);
    }
  })
}).fields( fields() );




