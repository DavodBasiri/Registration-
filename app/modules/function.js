const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
function hashString(str){
    const salt=bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str,salt);
}
function tokenGenerator(payload) {
    
    const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn : "3d"});
    process.env.TOKEN =token;
    return token
}
function tokenVerifyJWTToken(token){
    const result = jwt.verify(token,process.env.SECRET_KEY);
    if(!result?.email) throw { status : 401 ,message : "plz login" }
    return result    
    
}


module.exports = {
    hashString ,
    tokenGenerator ,
    tokenVerifyJWTToken
}