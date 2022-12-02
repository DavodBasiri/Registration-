const {body} = require("express-validator");
const { UserModel } = require("../../models/user");
function registerValidator(){
    return[
        body("frist_name").isLength({min : 4,max : 25}).withMessage("frist name name can not be empty")
        ,
        body("email").isEmail().withMessage("enter email corectly").custom( async email =>{
            const user = await UserModel.findOne({email});
            if(user) throw "email exist"
            return true;
        }) ,
        body("last_name").isLength({min : 4,max : 25}).withMessage("last name name can not be empty"),
        body("password").isLength({min : 6,max : 16}).withMessage("password 6-16 ")
        .custom((value,ctx) =>{
            if(!value) throw " password is empty";
            if(value !== ctx?.req?.body?.confirm_password) throw "passs and confirm_password is not equle";
            return true;
        })
    ]
}
function loginValidator(){
    return[
        body("email").isEmail().withMessage("enter email corectly") ,
        body("password").isLength({min:6, max:16}).withMessage("password 6-16 ")
    ]
}
module.exports={
    registerValidator ,
    loginValidator
}