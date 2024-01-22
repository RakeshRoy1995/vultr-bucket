import { mkzID } from "./data-formate";
const AWS = require('aws-sdk');
const multer = require("multer");

const endpoint = process.env.AwsEndPoint as string;
const region = process.env.AwsRegion as string;
const key = process.env.AwsAccessKey as string;
const secret = process.env.AwsSecretAccessKey as string;
const bucket = process.env.AwsS3Bucket as string;

const s3 = new AWS.S3({
  accessKeyId: key,
  secretAccessKey: secret,
  region: region
});


const storage = multer.memoryStorage();
const uploads = multer({ storage: storage });



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
        { name: "image", maxCount: 4 } ,// in <input name='fileName' />
        { name: "product_image[0][image]", maxCount: 1 } ,// in <input name='fileName' />
        { name: "product_image[1][image]", maxCount: 1 } ,// in <input name='fileName' />
        { name: "product_image[2][image]", maxCount: 1 } ,// in <input name='fileName' />
        { name: "product_image[3][image]", maxCount: 1 } ,// in <input name='fileName' />
        { name: "product_image[4][image]", maxCount: 1 },
    )
    return array
}


export const upload = uploads.fields( fields() );

// AWS Upload
// export const fileRenameAndUpload = async(req : any) =>{
  
//   return getDataImgData(req)
//   .then(function(data) {
//     return data
//   })
//   .catch(function(error) {
//     return false
//   });
// }
// vultr upload 
export const fileRenameAndUpload = (req : any) =>{
  
  return req.key
  
}


function getDataImgData(req:any) {
  const params = {
    Bucket: bucket,
    Key: mkzID(5) + req.originalname,
    Body: req.buffer
  };
  return new Promise(function(resolve, reject) {
     s3.upload(params, async(err:any, data:any) => {
      if (err) {
        reject(err)
      }
      resolve(data.key);
    });
  });
}


export const deleteFileFromCDN = async (fileName: string): Promise<'success' | 'fail'> => {
  try {
      const params = {
          Bucket: bucket,
          Key: fileName,
      };
      await s3.deleteObject(params).promise();
      return 'success';
  } catch (err: any) {
      return 'fail';
  }
};
