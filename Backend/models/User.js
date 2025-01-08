import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName:{type:String, required:true},
    email:{type:String, required:true, unique:true, lowercase:true},
    password:{type:String, required:true},
    confirmPassword:{type:String},
},{
    timestamps:true
});

const User = mongoose.model("User", userSchema);
export default User;