import * as express from 'express';

import CatCtrl from './controllers/cat';
import PaisCtrl from './controllers/pais';
import EstadoCtrl from './controllers/estado';
import CidadeCtrl from './controllers/cidade';
import UserCtrl from './controllers/user';
import Cat from './models/cat';
import Pais from './models/pais';
import Estado from './models/estado';
import Cidade from './models/cidade';
import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const paisCtrl = new PaisCtrl();
  const estadoCtrl = new EstadoCtrl();
  const cidadeCtrl = new CidadeCtrl();
  const userCtrl = new UserCtrl();

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