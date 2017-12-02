import * as express from 'express';

import CatCtrl from './controllers/cat';
import PaisCtrl from './controllers/pais';
import UserCtrl from './controllers/user';
import Cat from './models/cat';
import Pais from './models/pais';
import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const paisCtrl = new PaisCtrl();
  const userCtrl = new UserCtrl();

  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

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
