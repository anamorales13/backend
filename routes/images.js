'use strict'

var express= require('express');
//var imagesControllers= require('../controllers/images');

var multer=require('multer');
const upload=multer({dest: "./public/"})
var router = express.Router(); //disponible el router


router.post('/images-add', (req, res) =>{

    console.log(req.file);

    res.send('received');

});



module.exports=router;
