import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const chatBox = document.querySelector(".chat-box");

const textInput = document.querySelector("#message");
const textBtn = document.querySelector("#message-btn");

const roomIdInput = document.querySelector("#room-id");
const roomIdBtn = document.querySelector("#room-id-btn");

const socket = io("http://localhost:3000");
socket.on("connect",()=>{
    printOnChatBox(`Your Chat ID:${socket.id}`)
})
socket.on("receive-message",(text)=>{
    printOnChatBox(text);
})
function printOnChatBox(text){
    let div = document.createElement('div');
    div.classList.add("show-message");
    div.textContent = text;
    chatBox.append(div);
    textInput.value = "";
}

textBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    let text = textInput.value;
    let room = roomIdInput.value;
    console.log(text);

    if(text === "") return;
    socket.emit("send-message",text,room);
    printOnChatBox(text);
    
})

roomIdBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let room_id = roomIdInput.value;

    socket.emit('join-room',room_id , message=>{
        printOnChatBox(message);
    });
})