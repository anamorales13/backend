'use strict'

var express= require('express');
//var imagesControllers= require('../controllers/images');


var router = express.Router(); //disponible el router

router.post('/images-add', (req, res) =>{
    console.log(req.body);
    console.log(req.file);

    res.send('Received');
})


module.exports=router;
