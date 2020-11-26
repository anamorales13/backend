
/*conexion a la base de datos
y crearemos el servidor*/

'use strict' 

var mongoose = require('mongoose');
//cargar archivo app
var app= require('./app');
var port= process.env.PORT || 3900;//variable puerto. El que queremos utilizar
var url= process.env.MONGO_DB;

mongoose.set('useFindAndModify', false); 
mongoose.Promise= global.Promise;

mongoose.connect(url,{ useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => {
        console.log("La conexión a la BD se ha realizado con exito!");


        //Creación del servidor y ponerme a escuchar peticiones http
      /*  app.listen(port, ()=> {
                ejecuta lo que quieres hacer
        });*/

        app.listen(port, ()=> {
            console.log('servidor corriendo en' +port +" " + url);

        });
});

