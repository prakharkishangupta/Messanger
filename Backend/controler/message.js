import Conversation from "../models/conversation.js";
import Message from "../models/Message.js";
import { getRecieverSocketId } from "./Socket.IO/server.js";
import { io, users } from "./Socket.IO/server.js";

export const sendMessage = async (req, res)=>{
    console.log("message sent", req.body.message, req.params.id);
    try {
        const {message} = req.body;
        const {id:recieverId} = req.params;
        const senderId = req.user.userId;
        console.log(senderId);
        console.log("message: ", message);
        let conversation = await Conversation.findOne({
            participants: { $all : [senderId, recieverId]}
        })
        
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, recieverId],
                messages: []
            })
        }
        const newMessage = await Message.create({
            senderId,
            recieverId,
            message
        })
        if(newMessage){
            
            conversation.messages.push(newMessage._id);

        }
        await Promise.all([newMessage.save(), conversation.save()]);
        console.log(newMessage);
        const recieverSocketId = getRecieverSocketId(recieverId);
        console.log("provide: ", recieverSocketId, newMessage, recieverId);
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage", newMessage);
            console.log("provide: ", recieverSocketId, newMessage);
        }
        return res.status(201).json({message: "Message sent successfully", newMessage});
        
    } catch (error) {
        console.log("Error in sending message: ", error);
        return res.status(500).json("Error in sending messgae")
    }
}

export const getMessage = async (req, res)=>{
    console.log("message got", req.params.id);
    try {
        const {id:chatUser} = req.params;
        const senderId = req.user.userId;
        
        let conversation = await Conversation.findOne({
            participants: { $all : [senderId, chatUser]}
        }).populate("messages")     // The .populate("messages") ensures that the messages field in the Conversation document is replaced with the actual Message documents referenced by their ObjectIDs
        
        if(!conversation){
            return res.status(201).json("Lets begin the chat!")
        }
        const messages = conversation.messages;
        return res.status(201).json({messages});
        
    } catch (error) {
        console.log("Error in getting message: ", error);
        return res.status(500).json("Error in getting messgae")
    }
}