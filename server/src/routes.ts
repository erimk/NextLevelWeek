import express, { response } from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

//desacoplando as rotas do servidor.
const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);
//controllers: index(lista), show(unico), create/store, update, delete/destroi
routes.post('/points', pointsController.create);

routes.get('/points/:id', pointsController.show);

routes.get('/points', pointsController.index);

export default routes;

//Service partterns podem ser usados
//Repository map, data mapper