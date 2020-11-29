
var multer=require('multer');


const storage= multer.diskStorage({
    
    destination: function (req, file, cb){
        cb(null, '/upload/users')
        console.log("hola storage")
    },
    filename: function (req, file, cb){
        cb(null, `${file.originalname}-${Date.now()}`)
        console.log("original" + file.originalname);
    }
})

const uploadUser = multer({storage})


module.exports= uploadUser;