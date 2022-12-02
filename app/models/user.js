const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    frist_name : {type :String },
    last_name : { type: String },
    email : { type: String, required: true, unique: true },
    password : {type : String,required :true  },
    otp : {type : Object , default :{
        code : 0 ,
        expiresIn : 0
    }},
    token : {type : String,default : ""}

},{
    timestamps :true
}
);
module.exports ={
    UserModel : mongoose.model("user",Schema)
}