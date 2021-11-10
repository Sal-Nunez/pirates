const PirateController = require('../controllers/pirate.controller')
// const { basicAuth } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api', PirateController.index)
    app.post('/api/pirates', PirateController.createPirate)
    app.get('/api/pirates', PirateController.allPirates)
    app.get('/api/pirates/:id', PirateController.onePirate)
    app.put('/api/pirates/:id', PirateController.editPirate)
    app.delete('/api/pirates/:id', PirateController.deletePirate)
}