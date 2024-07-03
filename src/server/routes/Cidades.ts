import { Router } from 'express';
import { ensureAuthenticated } from '../shared/middleware/EnsureAuthenticated';
import { cidadesControllers } from '../controllers';

export const routesCidades = (router: Router) => {

  const rotas = [
    router.post('/cidades', ensureAuthenticated, cidadesControllers.createValidator, cidadesControllers.create),
    router.get('/cidades', ensureAuthenticated, cidadesControllers.getAllValidator, cidadesControllers.getAll),
    router.get('/cidades/:id', ensureAuthenticated, cidadesControllers.GetByIdValidator, cidadesControllers.getById),
    router.put('/cidades/:id', ensureAuthenticated, cidadesControllers.UpdateByIdValidator, cidadesControllers.updateById),
    router.delete('/cidades/:id', ensureAuthenticated, cidadesControllers.deleteByIdValidator, cidadesControllers.deleteById),

  ];

  return {...rotas};

};
