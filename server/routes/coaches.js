const coachRoutes=require('express').Router()
const controllerCoach=require('../controller/coaches')
const verify=require('../utils/verify')

coachRoutes.get('/getCoaches',controllerCoach.getCoaches)
coachRoutes.get('/getCoach/:id',controllerCoach.getCoacheById)
coachRoutes.post('/addCoach',verify.verifyToken,verify.verifyAdmin,controllerCoach.addCoach)
coachRoutes.put('/updateCoach/:id',verify.verifyToken,verify.verifyAdmin,controllerCoach.updateCoach)
coachRoutes.delete('/deleteCoach/:id',verify.verifyToken,verify.verifyAdmin,controllerCoach.deleteCoach)


module.exports=coachRoutes