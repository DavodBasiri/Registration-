const {param} = require("express-validator");

function mongoIdValidator(){
    return [
        param("id").isMongoId().withMessage("can not find id") 
    ]
}
module.exports = {
    mongoIdValidator
}