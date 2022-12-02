const { UserModel } = require("../../models/user");
const { tokenVerifyJWTToken } = require("../../modules/function");

const checkLogin = async (req,res,next) =>{
    try {

        const authorization = req?.headers?.authorization;
        if(!authorization) throw { status : 401 ,message : "plz authorization" }
        let token = authorization.split(" ")?.[1];
        if(!token)  throw { status : 401 ,message : "plz send token" }
        const result = tokenVerifyJWTToken(token);
        const {email}=result;
        const user = await UserModel.findOne({email},{password : 0});
        if(!user) throw { status : 401 ,message : "user not found" }
        req.user=user;
        next();
    } catch (error) {
        next(error)
    }
}
module.exports = {
    checkLogin
}