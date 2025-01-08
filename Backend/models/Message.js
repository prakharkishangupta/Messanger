import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    senderId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    recieverId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    message:{
        type: String, 
        required:true,
        // maxLength:1000,
        // trim:true,
        // validate:[{
        //     validator: (value)=> value.length>0,
        //     message:"Message can not be empty"
        // }]
    }
},{
    timestamps:true
})

const Message = mongoose.model("Message", messageSchema);
export default Message;