var validator = require('validator');
var Admin = require('../models/admin');
var fss = require('fs');
var path = require('path');

var express = require("express");

var session = require("express-session");

var app = express();

app.use(session({
    secret: "1352ljdainekg875d",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

var controllers = {


 loginUserAdmin: (req, res) => {
    var params = req.body;
    var administrador = "administrador";

    userString = params.usuario;
    passwString = params.password;


    Admin.findOne({ usuario: { $eq: userString }, tipo: { $eq: administrador } })
        .exec((err, users) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: "Error en la petición"
                });
            }
            if (users) {


                bcrypt.compare(passwString, users.password, (err, check) => {
                    if (check) {
                        // if(params.gettoken){
                        //generar y devolver el token
                        users.password = undefined;
                        users.alumnos = undefined;
                        return res.status(200).send({
                            status: 'sucess',
                            users,
                            token: jwt.createToken(users)

                        })
                       

                    } else {
                        return res.status(404).send({
                            status: 'error',
                            message: 'El usuario no ha introducido los datos correstamente'
                        });
                    }
                })
            } else {
                return res.status(404).send({
                    status: 'error',
                    message: 'El usuario no ha introducido los datos correstamente'
                });
            }
        })

},

setadmin:(req, res) =>{
     var userId = req.params.id;
        var update = req.body;

        //borrar propiedad password
        delete update.password;

       

        Admin.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdate) => {
            if (err) {
                return res.status(500).send({
                    message: 'Error en la peticion'
                });
            }
            if (!userUpdate) {
                return res.status(404).send({
                    message: 'No se ha podido actualizar el usuario'
                });
            }

            userUpdate.password = undefined;
           
            return res.status(200).send({
                status: 'sucess',
                user: userUpdate

            })
        });
},

comparePassword: (req, res) => {

    var userId = req.params.id;
    var params = req.body;


    passwString = params.password;

  
    Admin.findById(userId, (err, userget) => {
        if (err) {
            return res.status(500).send({
                message: 'Error en la petición'
            });
        }
        if (!userget) {
            return res.status(404).send({
                message: 'El usuario no existe'
            });
        }
        if (userget) {
          
            bcrypt.compare(passwString, userget.password, (err, check) => {
                if (check) {
                    console.log("sucess");
                    return res.status(200).send({
                        status: 'sucess'
                    })
                } else {
                    return res.status(200).send({
                        status: 'failed'
                    })
                }

            });
        }

    });
},

updatePassword: (req, res) => {
    var userId = req.params.id;
    var update = req.body;

    try {

        Profesor.findOne({ '_id': req.params.id }, function (err, updateuser) {

           // Si hay errores, se retornan
            if (err) {
                return done(err);
            } else {


                var profesor = new Admin();

                profesor.nombre = updateuser.nombre;
                profesor.usuario = updateuser.usuario;
                profesor.email = updateuser.email;
                profesor.telefono = updateuser.telefono;
                profesor.uniDestino = updateuser.uniDestino;
                profesor.image = updateuser.image;
                /* alumno.apellido= update.apellido;*/

                bcrypt.hash(update.password, null, null, (err, hash) => {
                    profesor.password = hash;

                    Admin.findByIdAndUpdate(req.params.id, { $set: { password: profesor.password } }, { new: true }, function (err, user) {
                        if (err || !user) {
                            return res.status(500).send({
                                status: 'error',
                                message: 'El alumno no se ha guardado'
                            });
                        }

                        return res.status(200).send({
                            status: 'sucess',
                            profesor: user
                        });
                    });

                });
            }

        });



    } catch (e) {
        res.send('error');
    }


},

uploadImage: (req, res) => {

    var userId = req.params.id;
    var filename = 'Imagen no subida';
    var profesor = new Admin();

  

    if (!req.files) {
        return res.status(404).send({
            status: 'error',
            message: file_name
        });

    }

    /*  if (req.files) {*/
    var file_path = req.files.file0.path;
    console.log(file_path);
    var file_split = file_path.split('\\');
    var file_name = file_split[2];
   

    //sacar extensión del archivo para comprobar

    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];
  

    
    //comprobar que las extensiones son correctas:
    if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
        //actualizar imagen de usuario
        Admin.findOne({ _id: userId }, (err, userUpdate) => {
            if (err) {
                return res.status(500).send({
                    message: 'Error en la peticion'
                });
            }
            if (!userUpdate) {
                return res.status(404).send({
                    message: 'No se ha podido actualizar el usuario'
                });
            }
            profesor = userUpdate;
            profesor.image = file_name;

            profesor.save((errn, alumnoStored) => {

                if (errn || !alumnoStored) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'El alumno no se ha guardado'
                    });
                }

                alumnoStored.password = undefined;

                return res.status(200).send({
                    status: 'sucess',
                    profesor: alumnoStored
                });
            });
            /*userUpdate.password = undefined;
            return res.status(200).send({
                status: 'sucess',
                alumno: userUpdate
            })*/

        })
    } else {
        //borrar la imagen
        fss.unlink(file_path, (err) => {
            if (err) {
                return res.status(200).send({
                    message: 'Extension no valida'
                });
            }
        });

    }

    /*} else {
        return res.status(200).send({
            message: 'No se han subido imagenes'
        });
    }*/

},
getImageFile: (req, res) => {

    var image_file = req.params.imageFile;
    var path_file = './upload/users/' + image_file;

    fss.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({
                message: 'No existe la imagen'
            });
        }
    });



},

deleteImageFile: (req, res) => {
    var userId = req.params.id;
   

    Admin.findOne({ _id: userId }, (err, user) => {
        if (err) {
            return res.status(500).send({
                message: 'Error en la petición'
            });
        }
        if (!user) {
            return res.status(404).send({
                message: 'El usuario no existe'
            });
        }
       
        if (user.image != 'user-default.jpg') {
            console.log("entra en eliminar");

            fss.unlink('upload/users/' + user.image, (err) => {
                if (err) {
                    return res.status(200).send({
                        message: 'Error al borrar la imagen'
                    });
                }
            });
        }

    })
},

}
module.exports = controllers;