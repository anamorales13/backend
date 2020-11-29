
var multer=require('multer');


const storage= multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './upload/users')
    },
    filename: function (req, file, cb){
        cb(null, `${file.originalname}-${Date.now()}`)
    }
})

const uploadUser = multer({storage})


module.exports= uploadUser;