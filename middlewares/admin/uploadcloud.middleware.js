
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')


cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.cloud_key, 
    api_secret: process.env.cloud_secret
  });
 
 module.exports.uploadSingle = function (req, res, next) {
    if(req.file){
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                  (error, result) => {
                    if (result) {
                      resolve(result);
                    } else {
                      reject(error);
                    }
                  }
                );
    
              streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
    
        async function upload(req) {
            let result = await streamUpload(req);
            req.body[req.file.fieldname] = result.url;
            next();
        }
        upload(req);
    }
    else  {
        next();
    }
}