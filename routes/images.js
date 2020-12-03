'use strict'

var express= require('express');
//var imagesControllers= require('../controllers/images');

var multer=require('multer');
const upload=multer({dest: "../public"})
var router = express.Router(); //disponible el router

router.post('/image-add', upload.single("file0"), (req,res) =>{
    console.log(req.files);
    res.send("200");
});




module.exports=router;
