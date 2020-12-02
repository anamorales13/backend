'use strict'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;



var AdminSchema=Schema ({   

    nombre: String,
    usuario: String, 
    password: String,
    email: String,
    image: String,
    tipo:String,
    rol:String
      
});



module.exports= mongoose.model('Admin', AdminSchema);