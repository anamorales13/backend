'use strict'

var express= require('express');


var multer=require('multer');
const cloudinary= require('cloudinary');
var router = express.Router(); 

const Image = require('../models/images');
require('dotenv').config({path: 'secret.env'});


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

router.post('/images-add', async (req, res) =>{

    console.log(req.file);

   const result = await cloudinary.v2.uploader.upload(req.file.path); //el metodo va a tomar tiempo entonces
   //result es la imagen ya subida

   console.log(result);
   console.log(result.format);
  const newImage=   new Image({
        imageUrl: result.url,
        cloud_url:result.public_id,
        format: result.format
    })
    await newImage.save();

    
    return res.status(200).send({
       image: newImage
    });

});



module.exports=router;
