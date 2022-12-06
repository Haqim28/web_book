const multer = require('multer')

exports.uploadfile = (imageFile) => {

        //Destination & Rename file
        const storage = multer.diskStorage({
            destination : function (req,file,cb){
                cb(null,'uploads');
            },
            filename : function(req,file,cb){
                cb(null,Date.now() + "-" + file.originalname.replace(/\s/g,""));
            },
        })

        //filter extension file
    const fileFilter = function(req,file,cb){
            if(file.fieldname == imageFile){
                if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)){
                    req.fileValidationError = {
                        message : 'Only images file are allowed!'
                    }

                    return cb(new Error('Only images file are allowed!', false))
                }
            }
            cb (null,true);
        }
        //max min file size
        // MB -> KB -> byte 
        const sizeInMB = 10;
        const maxSize = sizeInMB * 1000 * 1000

        const upload= multer({
            storage,
            fileFilter,
            limits:{
                fileSize: maxSize
            },
        }).single(imageFile);

        //handler filter , doesn't file, limit size
        return (req,res,next) => {
            upload(req,res,function(err){

                if (req.fileValidationError){
                    return res.status(400).send(req.fileValidationError)
                }

                // if(!req.file && !err){
                //     return res.status(400).send({
                //         message : "Please select file uploads"
                //     })
                // }

                if (err){
                    if(err.code == 'LIMIT_FILE_SIZE'){
                        return res.status(400).send({
                            message : "Max file size 10 MB"
                        })
                    }

                    return res.status(400).send(err)
                }

                return next();

            })
        }
}