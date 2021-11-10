const UserController = require('../controllers/user.controller')
const { basicAuth } = require('../config/jwt.config');

module.exports = app => {
    app.post('/api/login', UserController.login)
    app.post('/api/register', UserController.register)
    app.get('/api/checkLogin', basicAuth, UserController.checkLogin)
    app.put('/api/users/:id', basicAuth, UserController.editUser)
    app.delete('/api/users/:id', basicAuth, UserController.deleteUser)
    app.get('/api/logout', basicAuth, UserController.logout)
    app.get('/api/users', UserController.allUsers)
}