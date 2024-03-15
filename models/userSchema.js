import mongoose from "../Utilities/mongodb.js";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    mail:{type:String,unique:true,required:true},
    datas:[
        {task:{type:String},
         status:{type:String},
         date:{type:Date}}
    ]
},{versionKey:false});
const User=mongoose.model('User',userSchema,'User');

export default User;
