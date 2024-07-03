import { Router } from 'express';
import { usuariosControllers } from '../controllers';

export const routerUsuarios = (router: Router): Router[] => {
  const rotas = [
    router.post('/cadastrar', usuariosControllers.signUpValidation, usuariosControllers.signUp),
    router.post('/entrar', usuariosControllers.signInValidation, usuariosControllers.signIn),
  ];

  return {...rotas};
};