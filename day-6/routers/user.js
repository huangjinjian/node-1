const Router = require('koa-router')
let userController = require('../controllers/user_controller')

const router = new Router()

router
  .get('/user/register', userController.showRegister)
  .get('/user/login', userController.showLogin)

  .post('/user/do-register', userController.doRegister)

  .post('/user/check-usernamer', userController.checkUsername)

  .post('/user/do-login', userController.doLogin)

  .get('/user/get-pic', userController.getPic)

module.exports = router
