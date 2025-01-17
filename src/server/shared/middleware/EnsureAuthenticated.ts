import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JWTservice } from '../services';

export const ensureAuthenticated: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'não autorizado'
      }
    });
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'não autorizado'
      }
    });
  }

  const jwtData = JWTservice.verify(token);

  if (jwtData === 'JWT_SECRET_NOT_FOUND'){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Erro ao verificar o token'
      }
    });
  } else if (jwtData === 'INVALID_TOKEN') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Não autorizado'
      }
    });
  }

  req.headers.idUsuario = jwtData.Uid!.toString();

  return next();

};