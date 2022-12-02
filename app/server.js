const express = require("express");
const mongoos = require("mongoose");
const creatError = require("http-errors");
const path = require("path");
const { AllRoutes } = require("./router/router");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
module.exports = class Application{
    #app = express();
    constructor(PORT,DB_URL){
        this.configDataBase(DB_URL);
        this.configApplication();
        this.createServer(PORT);
        this.createRoutes();
        this.errorHandler();

    }
    configApplication(){
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended : true}));
        this.#app.use(express.static(path.join(__dirname,"..","public")));
        this.#app.use("/api-doc",swaggerUI.serve,swaggerUI.setup(swaggerJsDoc({
            swaggerDefinition : {
                info : {
                    title : "BoT Test API",
                    version :"1.0.0",
                    description : "Node Js",
                    contact: {
                        name: "Davod Basiri",
                        url: "https://logrocket.com",
                        email: "davodbasiri95@gmail.com",
                      },
                },
                servers : [
                    {
                        url: "http://localhost:3000"
                    }
                ],security: [ { bearerAuth: [] } ],
            },
            apis : ["./app/router/**/*.js"]
        })))
    }
    createServer(PORT){
        const http=require("http");
        http.createServer(this.#app).listen(PORT , () =>{
            console.log("run > http://localhost:"+PORT+'/api-doc');
        })
    }
    configDataBase(DB_URL){
        mongoos.connect(DB_URL, (error)=> {
            if(!error)
                return console.log("conected to MongoDB");
            return console.log("faild to conect to MongoDB")
        })
    }
    errorHandler(){
        this.#app.use((req,res,next) =>{
            
            next(creatError.NotFound("Page Not Found Now"))
            
        })
        this.#app.use((error,req,res,next) => {
            const serverError= creatError.InternalServerError();
            const statusCode = error.status || serverError.status ;
            const message = error.message || serverError.message ;
            return res.status(statusCode).json({
                errors: {
                    statusCode,
                    success : false ,
                    message
                }
            })
        })

    }
    createRoutes(){
        this.#app.get("/",(req,res,next) =>{
            return res.json({
                message : "this is a test"
            })
        })
        this.#app.use(AllRoutes)  ;
        
    }
}