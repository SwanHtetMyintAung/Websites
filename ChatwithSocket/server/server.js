
const io = require("socket.io")(3000,{
    cors:{
        origin:'*'
    }
});

io.on("connection",socket=>{
    socket.on("send-message",(text,room)=>{
        if(room === ""){
            socket.broadcast.emit('receive-message',text);
        }else{
            socket.to(room).emit('receive-message',text);
        }
    })
    socket.on('join-room',(room_id , printOnClient)=>{
        socket.join(room_id);
        printOnClient(`You Joined ${room_id}`);
    })
});
