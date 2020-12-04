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

   const result = await cloudinary.v2.uploader.upload(req.file.path); //el metodo va a tomar tiempo entonces
   //result es la imagen ya subida

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

router.get('/images/delete/:photo_id', async(req,res)=>{
    const {photo_id}= req.params;

    const photo= await Image.findByIdAndDelete(photo_id);
    const result= await cloudinary.v2.uploader.destroy(photo.cloud_url)
    console.log(result);
});



module.exports=router;
