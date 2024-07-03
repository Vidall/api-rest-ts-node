import { Router } from 'express';
import { ensureAuthenticated } from '../shared/middleware';
import { alunosControllers } from '../controllers';

export const routesPessoas = (router: Router) => {

  const rotas = [
    router.post('/alunos', ensureAuthenticated, alunosControllers.createValidation, alunosControllers.create),
    router.get('/alunos', ensureAuthenticated, alunosControllers.getAllValidation, alunosControllers.getAll),
    router.get('/alunos/:id', ensureAuthenticated, alunosControllers.getByIdValidation, alunosControllers.getById),
    router.put('/alunos/:id', ensureAuthenticated, alunosControllers.UpdateByIdValidation, alunosControllers.updateById),
    router.delete('/alunos/:id', ensureAuthenticated, alunosControllers.deletByIdValidation, alunosControllers.deleteById),

  ];

  return {...rotas};

};
