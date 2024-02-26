
const io = require("socket.io")(3000,{
    cors:{
        origin:'*'
    }
});
let names ={};
io.on("connection",socket=>{
    socket.on("send-name",(name)=>{
        if(name=="")return;
        names[socket.id] = name;
    })
    socket.on("send-message",(text,room)=>{
        if(room === ""){
            socket.broadcast.emit('receive-message',{message:text , user:names[socket.id]});
        }else{
            socket.to(room).emit('receive-message',{message:text , user:names[socket.id]});
        }
    })
    socket.on('join-room',(room_id , printOnClient)=>{
        socket.join(room_id);
        printOnClient(`You Joined ${room_id}`); 
    })
    socket.on("typing",()=>{
        socket.broadcast.emit("receive_typing",socket.id);
    });
    socket.on("not_typing",()=>{
        socket.broadcast.emit("receive_not_typing",socket.id);
    });
});
