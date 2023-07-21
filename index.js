var app = require('express')();
var http = require('http').Server(app)
const { Socket } = require('dgram');
var path = require('path');
// const { Socket } = require('socket.io');
var io = require('socket.io')(http);
app.get("/", function (req, res) {
    var options = {
        root: path.join(__dirname)
    }
    var fileName = 'index.html'
    res.sendFile(fileName, options);
})
// var users = 0;

// var vamsiNameSpace = io.of('/vamsi')

// vamsiNameSpace.on('connection', function (socket) {
// console.log('user connected');
// users++;
// vamsiNameSpace.emit('vamsCustomEvent', ' vamsiNameSpace customEvent has been triggered');
// socket.emit('newUserConnected', { message: 'Welcome to community' })
// socket.broadcast.emit('newUserConnected', { message: users + " users are online" })
//for all users
// io.sockets.emit('broadcast',
//     { message: users + " users are online" }
// ) 

// setTimeout(function () {
// predefined function
// socket.send('Your messages are end to end encrypted ')
// custom event
// socket.emit('customEventFromServerSide', { description: 'Custom description from custom event' })
// }, 3000)
// socket.on('customEventFromClientSide', function (data) {
// console.log(data.description);
// })
// socket.on('disconnect', function () {
// users--;
// //for all users 
// // io.sockets.emit('broadcast',
// //     { message: users + " users are online" }
// // )

// socket.broadcast.emit('newUserConnected', { message: users + " users are online" })

//         console.log('User disconnected');
//     })
// });

var roomNo = 1
var full = 0

io.on('connection', function (socket) {
    console.log('user connected');
    
    socket.join('room-'+roomNo)
        io.sockets.in('room-'+roomNo).emit('connectedToRoom', 'you are connected to room'+roomNo)

        full++
        if(full >= 2){
            full= 0;
            roomNo++;
        }
socket.on('disconnect', function (socket) {
    console.log('user disconnected');
})
})

http.listen(3000, function () {
    console.log('serving on port 3000');
})