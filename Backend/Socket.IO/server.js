import { Server } from "socket.io";
import http from "http";
import express from "express"

const app = express();


const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: "http://localhost:4001", // Your frontend origin
        methods: ["GET", "POST", "PUT", "DELETE"],
       
    }
});

export const getRecieverSocketId = (recieverId)=>{
    console.log("recieverId: ", recieverId);
    return users[recieverId];
}
export const getSenderSocketId = (senderId)=>{
    console.log("senderId: ", senderId);
    return users[senderId];
}
const users = {};

io.on("connection", (socket)=>{
    console.log("New client connected", socket.id);
    const userId = socket.handshake.query.userId;
    if(userId){
        users[userId] = socket.id;
        console.log("users: ", users);
    }
    io.emit("getOnlineUser", Object.keys(users))
    socket.on("disconnect", ()=>{
        console.log("Client disconnected", socket.id);
        delete users[userId];
        io.emit("getOnlineUser", Object.keys(users))
    })
})

export {app, io, server, users};