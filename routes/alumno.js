'use strict'

var express= require('express');
var AlumnoController= require('../controllers/alumno');


var router = express.Router(); //disponible el router
//var md_auth= require('../Middleware/authenticated');

/*
var multipart= require('connect-multiparty');
var md_uploadd= multipart({uploadDir: './public/users'});
var md_uploaddoc= multipart({uploadDir: './public/users/documentos'});
const uploadimage= require('../libs/storage');*/


/* IMAGENES */
var multer=require('multer');
const cloudinary= require('cloudinary');
const Alumno = require('../models/alumno');
require('dotenv').config({path: 'secret.env'});


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


//RUTAS VALIDAS
router.get('/pruebas',/* md_auth.ensureAuth*/ AlumnoController.pruebas);
router.post('/save', AlumnoController.save);
router.post('/login' , AlumnoController.loginUser);
router.get('/user/:id', /*md_auth.ensureAuth,*/ AlumnoController.getUser);
router.put('/update-user/:id' , /*md_auth.ensureAuth,*/ AlumnoController.updateUser);
router.put('/update-password/:id', AlumnoController.updatePassword);
router.post('/upload-image-user/:id', /*md_uploadd,*/ /*uploadimage.single('file0'),*/ AlumnoController.uploadImage );
router.get('/get-image-user/:imageFile', AlumnoController.getImageFile );
router.delete('/delete-image/:id'/*,md_uploadd*/, AlumnoController.deleteImageFile);
router.post('/compararPassword/:id', AlumnoController.comparePassword);
router.post('/documentos/:id', AlumnoController.addDocumentos);
router.put('/cambioEstado/:id/:name', AlumnoController.cambiarEstado);
router.put('/upload-image/:id/:name'/*, md_uploaddoc*/, AlumnoController.upload);
router.get('/profesores/:id', AlumnoController.getProfesores);
router.put('/savedestino/:id', AlumnoController.guardarDestino);
router.put('/saveprofesor/:id', AlumnoController.guardarProfesorCoordinador);

router.get('/get-alumnos-profesor/:id/:pages?', AlumnoController.getalumnosdeprofesor);
router.get('/coordinador/:id/:pages?', AlumnoController.getalumnosdecoordinador);
router.get('/alumnos', AlumnoController.getAlumnos);
router.put('/setdestino/:iddestino', AlumnoController.setdestinos);
router.put('/setcoordinador/:id', AlumnoController.setcoordinador);
/* dar de baja*/
router.delete('/dardebaja/:id', AlumnoController.dardebaja);
router.delete('/eliminar', AlumnoController.eliminar);

router.get('/get-image/:image', AlumnoController.getImage);

router.get('/getdocumentos/:id', AlumnoController.getDocumentos);


//rutas imagen

router.put('/add-files/:id', AlumnoController.addfiles)
router.put('/add-files-oficial/:id/:name', AlumnoController.addoficialfiles);




module.exports= router;