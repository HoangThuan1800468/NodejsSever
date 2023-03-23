import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        minlength:6,
        maxlength:20,
        unique:true
    },
    email:{
        type:String,
        require:true,
        minlength:10,
        maxlength:30,
        unique:true
    },
    password:{
        type:String,
        require:true,
        minlength:6
    },
    admin:{
        type:Boolean,
        default:false
    },
    
},
    {timestamps:true}
);
export const UserModel = mongoose.model('User',schema);