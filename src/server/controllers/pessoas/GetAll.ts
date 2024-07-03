import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { IQueryProps } from '../../database/models/Common';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { alunosProviders } from '../../database/providers/alunos';

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    id: yup.number().optional().default(0),
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.string()
  }))
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  const id = req.query.id || 0;
  const page = req.query.page || 1;
  const limit = req.query.limit || 7;
  const filter = req.query.filter || '';

  const result = await alunosProviders.getAll(page, limit, filter, id);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.OK).json(result);

};