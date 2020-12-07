
/*conexion a la base de datos
y crearemos el servidor*/

'use strict' 

var mongoose = require('mongoose');
//cargar archivo app
var app= require('./app');
const socketio = require('socket.io')
const http = require('https')

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

     /*   app.listen(port, ()=> {
            console.log('servidor corriendo en' +port +" " + url);

        });*/
});


//CHAT 

const server = http.createServer(app);//creando el server con http y express como handle request
const options={
    cors:true,
    origin:["https://anamorales13.github.io"],
   }
const client = socketio(server,options);

const {addUser, removeUser, getUser, getUserInRoom} =require('./controllers/user');


server.listen(port, () => {
    console.log("Server running in http://localhost:"+port)
  })

  

  

client.on('connection', (socket) => {
   
    socket.on('join', ({name, room}, callback)=>{
        const {error, user}= addUser({id:socket.id, name, room});
        
        if(error) return callback (error);
        
        socket.emit('message', {user:'admin', text:`${user.name}, Bienvenido a la sala ${user.room}`});
        socket.broadcast.to(user.room).emit('message',{user:'admin', text:`${user.name}, se acaba de unir!`});

        socket.join(user.room);

        client.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom(user.room)})

        callback();
    });

    socket.on('sendMessage', (message, callback)=>{
      
        const user=getUser(socket.id);
      
        client.to(user.room).emit('message', {user:user.name, text:message});
        client.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom(user.room)});
        callback();
    });


    socket.on('disco', () => {
       const user= removeUser(socket.id);

       if(user){
           client.to(user.room).emit('message', {user:'admin', text:`${user.name} ha abandonado la sala.`})
       }
    })
    
});