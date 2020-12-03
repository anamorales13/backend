
'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var ImagesSchema= Schema({
    imageUrl: String
  
}) ;

module.exports= mongoose.model('Imagen', ImagesSchema);