const { userRoutes } = require("./user");

const router =require("express").Router();
router.use("/user",userRoutes)
module.exports={
    AllRoutes : router
}