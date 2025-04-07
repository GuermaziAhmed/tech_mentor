const userRoutes=require('express').Router()
const controllerUser=require('../controller/users')
const verify=require('../utils/verify')
userRoutes.get('/getUsers',verify.verifyToken,verify.verifyAdmin,controllerUser.getUsers)
/* userRoutes.get('/checkauth',verifyToken.verifyToken,(req,res)=>{
    res.json({message:'authentification success',user:req.user})
})
userRoutes.get('/checkuser/:id',verifyToken.verifyToken,verifyToken.verifyUser,(req,res)=>{
    res.json({message:'authentification success you are logged in and u can delete ur account'})
})
userRoutes.get('/checkadmin/:id',verifyToken.verifyToken,verifyToken.verifyAdmin,(req,res)=>{
    res.json({message:'authentification success you are logged in and u can delete all account'})
}) */

userRoutes.get('/getUser/:id',verify.verifyToken,verify.verifyUser,controllerUser.getUserById)
userRoutes.put('/updateUser/:id',verify.verifyToken,verify.verifyUser,controllerUser.updateUser)
userRoutes.delete('/deleteUser/:id',verify.verifyToken,verify.verifyUser,controllerUser.deleteUser)


module.exports=userRoutes