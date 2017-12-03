"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cat_1 = require("./controllers/cat");
var pais_1 = require("./controllers/pais");
var estado_1 = require("./controllers/estado");
var cidade_1 = require("./controllers/cidade");
var user_1 = require("./controllers/user");
function setRoutes(app) {
    var router = express.Router();
    var catCtrl = new cat_1.default();
    var estadoCtrl = new estado_1.default();
    var cidadeCtrl = new cidade_1.default();
    var paisCtrl = new pais_1.default();
    var userCtrl = new user_1.default();
    // Cats
    router.route('/cats').get(catCtrl.getAll);
    router.route('/cats/count').get(catCtrl.count);
    router.route('/cat').post(catCtrl.insert);
    router.route('/cat/:id').get(catCtrl.get);
    router.route('/cat/:id').put(catCtrl.update);
    router.route('/cat/:id').delete(catCtrl.delete);
    // Cidades
    router.route('/cidades').get(cidadeCtrl.getAll);
    router.route('/cidades/count').get(cidadeCtrl.count);
    router.route('/cidade').post(cidadeCtrl.insert);
    router.route('/cidade/:id').get(cidadeCtrl.get);
    router.route('/cidade/:id').put(cidadeCtrl.update);
    router.route('/cidade/:id').delete(cidadeCtrl.delete);
    // Estados
    router.route('/estados').get(estadoCtrl.getAll);
    router.route('/estados/count').get(estadoCtrl.count);
    router.route('/estado').post(estadoCtrl.insert);
    router.route('/estado/:id').get(estadoCtrl.get);
    router.route('/estado/:id').put(estadoCtrl.update);
    router.route('/estado/:id').delete(estadoCtrl.delete);
    // Paises
    router.route('/paises').get(paisCtrl.getAll);
    router.route('/paises/count').get(paisCtrl.count);
    router.route('/pais').post(paisCtrl.insert);
    router.route('/pais/:id').get(paisCtrl.get);
    router.route('/pais/:id').put(paisCtrl.update);
    router.route('/pais/:id').delete(paisCtrl.delete);
    // Users
    router.route('/login').post(userCtrl.login);
    router.route('/users').get(userCtrl.getAll);
    router.route('/users/count').get(userCtrl.count);
    router.route('/user').post(userCtrl.insert);
    router.route('/user/:id').get(userCtrl.get);
    router.route('/user/:id').put(userCtrl.update);
    router.route('/user/:id').delete(userCtrl.delete);
    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map