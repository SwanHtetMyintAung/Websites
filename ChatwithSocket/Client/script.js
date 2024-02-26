import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const chatBox = document.querySelector(".chat-box");

const textInput = document.querySelector("#message");
const textBtn = document.querySelector("#message-btn");

const roomIdInput = document.querySelector("#room-id");
const roomIdBtn = document.querySelector("#room-id-btn");
const typing_status = document.querySelector(".typing-status");

const socket = io("http://localhost:3000");

var current_typing = [];

let name = prompt("Enter Your Name:");
socket.emit("send-name",name);

socket.on("connect",()=>{
    printOnChatBox(`Your Chat ID:${socket.id}`)
})
socket.on("receive-message",({message,user})=>{
    printOnChatBox(`${user}:${message}`);
})
socket.on("receive_typing",(id)=>{
    if(current_typing.includes(id)){
        console.log("already exist");
        return;
    }
    current_typing.push(id);
    change_current_typing(current_typing);
})
socket.on("receive_not_typing",(id)=>{
    let index = current_typing.find((c)=> c==id)
    let new_array = current_typing.splice(index,1)
    
    change_current_typing(current_typing);
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
    let message = textInput.value;
    let room = roomIdInput.value;

    if(message === "") return;
    socket.emit("send-message",message,room);
    printOnChatBox(`${name}:${message}`);
    
})

roomIdBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let room_id = roomIdInput.value;

    socket.emit('join-room',room_id , message=>{
        printOnChatBox(message);
    });
})

let typing_timer;

textInput.addEventListener('keydown',(e)=>{
    clearTimeout(typing_timer);
    socket.emit("typing");
    typing_timer = setTimeout(() => {
        socket.emit('not_typing');
    }, 3000);

})
function change_current_typing(arr){
    if(arr.length === 0){
        typing_status.textContent= "";
        return;
    }
    typing_status.textContent = `${arr} ${arr.length == 1 ? "is" : "are"} typing...`
}