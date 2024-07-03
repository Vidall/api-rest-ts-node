import * as yup from 'yup';
import { JWTservice, PassWordCrypto } from '../../shared/services';
import { IUsuario } from '../../database/models';
import { validation } from '../../shared/middleware';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { usuariosProviders } from '../../database/providers/usuarios';

interface IBodyProps extends Omit<IUsuario, 'id' | 'nome'> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email(),
    senha: yup.string().required().min(6)
  })),
}));

export const signIn = async (req: Request, res: Response) => {
  const {email, senha} = req.body;

  const usuario = await usuariosProviders.getByEmail(email);

  if(usuario instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Usuário ou senha inválidos'
      }
    });
  }
  const passwordMatch = await PassWordCrypto.verifyPassword(senha, usuario.senha!);

  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Usuário ou senha inválidos'
      }
    });
  } else {

    const accessToken = JWTservice.sigin({Uid: usuario.id});

    if (accessToken === 'JWT_SECRET_NOT_FOUND'){
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: 'Erro ao gerar o token de acesso'
        }
      });
    }

    return res.status(StatusCodes.OK).json({
      accessToken
    });
  }
};

