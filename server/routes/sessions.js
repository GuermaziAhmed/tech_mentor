const sessionRoutes=require('express').Router()
const controllersession=require('../controller/session')
const verify=require('../utils/verify')

sessionRoutes.get('/getsessions',verify.verifyToken,controllersession.getsessions)
sessionRoutes.get('/getsessionForUser/:userId',verify.verifyToken,controllersession.getSessionsByUserId)
sessionRoutes.get('/getsession/:id',verify.verifyToken,controllersession.getsessionById)
sessionRoutes.post('/addsession',verify.verifyToken,controllersession.addsession)
sessionRoutes.put('/updatesession/:id',verify.verifyToken,controllersession.updatesession)
sessionRoutes.delete('/deletesession/:id',verify.verifyToken,controllersession.deletesession)


module.exports=sessionRoutes