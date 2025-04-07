const authRoutes=require('express').Router()
const controllerAuth=require('../controller/auth')
authRoutes.post('/register',controllerAuth.register)
authRoutes.post('/login',controllerAuth.login)


module.exports=authRoutes