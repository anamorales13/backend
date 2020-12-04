
'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var ImagesSchema= Schema({
    imageUrl: String,
    cloud_url:String,
    format: String,
  
}) ;

module.exports= mongoose.model('Imagen', ImagesSchema);