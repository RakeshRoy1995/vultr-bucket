const axios = require('axios');

// Vultr API key
const apiKey = 'YOUR_VULTR_API_KEY';

// Image file path
const imagePath = '/path/to/your/image/image.iso';

export async function uploadImage(image:string) {

    const imagePath = image

    console.log(`imagePath`,imagePath );
  try {
    // Get upload URL
    const response = await axios.post(
      'https://api.vultr.com/v2/iso',
      {
        url : "https://sgp1.vultrobjects.com/ekshop-com-bd-v3"
      },
      {
        headers: {
          Authorization: `Bearer 26BV3C7CSHPJIHHL4QUB`,
        },
      }
    );

    const { url, filename } = response.data.iso;

    console.log(`url`,  url , filename);
    
    // Upload the image file
    const uploadResponse = await axios.put(url, require('fs').readFileSync(imagePath));

    console.log(`Image uploaded successfully as "${filename}"`);
  } catch (error :any) {
    console.error('Error uploading image:' , error);
  }
}


const base = process.env.API

export async function apiCall(url:string) {
   let link = base + url
  console.log(`imagePath`,imagePath );
try {
  // Get upload URL
  const response = await axios.get(
    link
  );

  return true

} catch (error :any) {
  console.error('Error uploading image:' , error);
}
}