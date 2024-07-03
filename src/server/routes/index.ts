import { Router } from 'express';
import { routesCidades } from './Cidades';
import { routesPessoas } from './Pessoas';
import { routerUsuarios } from './Usuarios';
const router = Router();

router.get('/', (req, res) => {
  return res.send({'name': 'luan'});
});

routesCidades(router);
routesPessoas(router);
routerUsuarios(router);

export { router };