'use strict'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;



const documentosOficialSchema = new Schema({
    nombre: String,
    fecha: {type:Date, default: Date.now},
    image: String,
    cloud_url:String,
    estado:String,
    formato: String
});

var AlumnoSchema=Schema ({   

    nombre: String,
    apellido1: String, 
    apellido2: String,
    usuario: String, 
    password: String,   
    email: String,
    telefono: String,
    tipo: String,
    destino: {type:Schema.ObjectId, ref:'Destino'},
    image: String,
    cloud_url:String,
    documentos: [documentosOficialSchema],
    profesor: {type: Schema.ObjectId, ref: 'Profesor'},
    coordinador: {type: Schema.ObjectId, ref: 'Profesor'}

   
  
   

});

AlumnoSchema.methods.setUrl = function setUrl (filename){
    //guardarmos la ULR absoluta:
    this.image = `https://plataforma-erasmus.herokuapp.com/public/${filename}`
 }

 AlumnoSchema.methods.setUrl = function setUrl (filename){
    //guardarmos la ULR absoluta:
    this.url = `https://plataforma-erasmus.herokuapp.com/publicdoc/${filename}`
 }



module.exports= mongoose.model('Alumno', AlumnoSchema);




