const bcrypt = require("bcrypt");
const { UserModel } = require("../../models/user");
const { hashString, tokenGenerator } = require("../../modules/function");

module.exports= new class AuthController{
    async register(req,res,next){
        try {
            const {password,email,last_name,confirm_password,frist_name}=req.body;
            const hash_password = hashString(password);
            const user = await UserModel.create({password  : hash_password ,email,last_name,frist_name })
            return res.json(user)
        } catch (error) {
            next(error)
        }

    }
    async login(req,res,next){
        try {
            const {email,password} = req.body;
            const user = await UserModel.findOne({email});
            if(!user) throw {status : 404 , message : "email or password is not valid"}
            const compereResult = bcrypt.compareSync(password,user.password);
            if(!compereResult) throw {status : 404 , message : "email or password is not valid"}
            const token ="Bearer "+tokenGenerator({email});
            user.token=token;
            user.save();
            return res.status(200).json({
                status : 200 ,
                success : true ,
                auth: true,
                message : "login complite" ,
                token
            })
        } catch (error) {
            next(error)
        }        
    }
    async getAllUser(req,res,next){
        try {
            const users = await UserModel.find();
            if(!users) throw {status : 404 , message : "can not found users"}
            return res.status(200).json({
                status : 200 ,
                success : true ,
                users 
            })
        } catch (error) {
            next(error)
        }
    }
    async removeUserByID(req,res,next){
        try {
            const userId = req.params.id;
            const authorization = req?.headers?.authorization;
            const user = await UserModel.find({_id:userId });
            if(!user) throw {status : 404 , message : "can not found User"}
            const deleteUser = await UserModel.deleteOne({ _id:userId, token : authorization});
            if(deleteUser.deletedCount == 0) throw {status : 400 , message : "can not delete User"}
            return res.status(200).json({
                status : 200 ,
                success : true ,
                message : "delete User" 
            })
            
        } catch (error) {
            next(error);
        }
    }
    async updatUser(req,res,next){
        try {
            const userId = req.params.id;
            const user = await UserModel.findById({ _id:userId});
            if(!user) throw {status : 404 , message : "can not found user"}
            let fields = ["frist_name","last_name"];
            let badValues =[""," ",null,NaN,undefined,-1];
            let data={...req.body};
            Object.entries(data).forEach(([key,value]) => {
                if(!fields.includes(key)) delete data[key]
                if(badValues.includes(value)) delete data[key]
            })
            const authorization = req?.headers?.authorization;
            const result= await UserModel.updateOne({_id : userId, token : authorization},{$set : data});
            if(result.modifiedCount > 0){
                return res.status(200).json({
                    status : 200,
                    success : true,
                    message : "update done"
                })
            }
            throw { status : 400 ,message : "can not update user" } 
        } catch (error) {
            next(error);
        }
    }
}
