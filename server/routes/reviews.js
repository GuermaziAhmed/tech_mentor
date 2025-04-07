const reviewRoutes=require('express').Router()
const controllerreview=require('../controller/reviews')
const verify=require('../utils/verify')

reviewRoutes.get('/getreviews',controllerreview.getreviews)
reviewRoutes.get('/getreview/:id',verify.verifyToken,controllerreview.getreviewById)
reviewRoutes.get('/getreviewByCoachId/:id',verify.verifyToken,controllerreview.getreviewByCoachId)
reviewRoutes.post('/addreview',verify.verifyToken,controllerreview.addreview)
reviewRoutes.put('/updatereview/:id',verify.verifyToken,controllerreview.updatereview)
reviewRoutes.delete('/deletereview/:id',verify.verifyToken,controllerreview.deletereview)


module.exports=reviewRoutes