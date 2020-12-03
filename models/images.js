
'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var ImagesSchema= Schema({
    titulo: String,
    descripcion:String, 
    url: String
  
}) ;

module.exports= mongoose.model('Imagen', ImagesSchema);