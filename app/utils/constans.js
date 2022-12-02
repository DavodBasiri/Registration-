module.exports ={
    MongoIdPatern : /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i ,
    ROLES : {
        USER : "USER" ,
        ADMIN : "ADMIN" ,
        WITER : "WITER" ,
        TEACHER : "TEACHER" ,
        SUPPPLIER : "SUPPPLIER"
    },
    ACCESS_TOKEN_SECRET_KEY : "F50F1FD3AC71BF569D250E0D38C3DF5C77FA9EDD1FC306C28D43AC58D0662A8C"
}