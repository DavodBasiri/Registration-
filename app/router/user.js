const userController = require("../http/controller/user.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatiorMaper } = require("../http/middlewares/chekErrors");
const { VerifyAccessToken } = require("../http/middlewares/verifyAccessToken");
const { mongoIdValidator } = require("../http/validations/public");
const { registerValidator, loginValidator } = require("../http/validations/user.validator");

const router =require("express").Router();
/**
 * @swagger
 *  tags :
 *      -    name : Adimn-Panel
 *           description : Action Of Admin (add , remove , edit and... )
 *      -    name : Category(Adimn-Panel)
 *           description : All Method And Routes About Category Section
 */
/**
 * @swagger
 * /user/register:
 *  post:
 *          tags : [Adimn-Panel]
 *          summary: Create New User 
 *          description: Add An User
 *          parameters:
 *          -   name: frist_name
 *              description: enter frist name
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: last_name
 *              description: enter last name
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: email
 *              description: enter email
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: password
 *              description: enter password
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: confirm_password
 *              description: enter password again
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal Server Error
 */
router.post("/register",registerValidator(),expressValidatiorMaper,userController.register);
/**
* @swagger
* /user/login:
*  post:
*          tags : [Adimn-Panel]
*          summary: Login User 
*          description: Login An User
*          parameters:
*          -   name: email
*              description: enter email
*              in: formData
*              required: true
*              type: string
*          -   name: password
*              description: enter password
*              in: formData
*              required: true
*              type: string
*          responses:
*              201:
*                  description: Success
*              400:
*                  description: Bad Request
*              401:
*                  description: Unauthorization
*              500:
*                  description: Internal Server Error
*/
router.post("/login",loginValidator(),expressValidatiorMaper,userController.login);
/**
* @swagger
* /user/get-all:
*  get:
*          tags : [Adimn-Panel]
*          summary: Get All User 
*          description: Show All User
*          responses:
*              201:
*                  description: Success
*              400:
*                  description: Bad Request
*              401:
*                  description: Unauthorization
*              500:
*                  description: Internal Server Error
*/
router.get("/get-all",userController.getAllUser);
/**
* @swagger
* /user/remove/{id}:
*  delete:
*          tags : [Adimn-Panel]
*          summary: delete User 
*          description: delete An User
*          parameters:
*          -   in: header
*              name: authorization
*              example: Bearer YourToken...
*          -   name: id
*              description: enter email
*              in: path
*              required: true
*              type: string
*          responses:
*              200:
*                  description: Success
*              400:
*                  description: Bad Request
*              401:
*                  description: Unauthorization
*              500:
*                  description: Internal Server Error
*/
router.delete("/remove/:id",checkLogin,mongoIdValidator(),expressValidatiorMaper,userController.removeUserByID);
/**
* @swagger
* /user/edit/{id}:
*  patch:
*          tags : [Adimn-Panel]
*          summary: Edit User 
*          description: Edit An User
*          parameters:
*          -   in: header
*              name: authorization
*              example: Bearer YourToken...
*          -   name: id
*              description: enter id
*              in: path
*              required: true
*              type: string
*          -   name: frist_name
*              description: enter frist name
*              in: formData
*              required: true
*              type: string
*          -   name: last_name
*              description: enter last name
*              in: formData
*              required: true
*              type: string
*          responses:
*              200:
*                  description: Success
*              400:
*                  description: Bad Request
*              401:
*                  description: Unauthorization
*              500:
*                  description: Internal Server Error
*/
router.patch("/edit/:id",checkLogin,mongoIdValidator(),expressValidatiorMaper,userController.updatUser);
/**
 * @swagger
 *  tags :
 *      name : IndexPage
 *      description : index page route and data
 */
/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes
 *      tags : [IndexPage]
 *      description: get all data for index page
 *      parameters:
 *          -   in: header
 *              name: accesstoken
 *              example: Bearer YourToken...
 *      responses:
 *          200 :
 *              description: success
 *          404: 
 *              description: NotFund
 */
 router.get("/",VerifyAccessToken, async(req,res,next) => {
                try {
                     return res.status(200).send("index Page Store");
                } catch (error) {
                    next(error)
     
    }
 });
module.exports={
    userRoutes : router
}

//