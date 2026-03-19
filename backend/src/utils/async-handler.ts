import type { NextFunction, Request, RequestHandler, Response } from 'express';

export const asyncHandler = <P = Request['params'], ResBody = unknown, ReqBody = unknown, ReqQuery = Request['query']>(
  fn: (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response<ResBody>, next: NextFunction) => Promise<void>
): RequestHandler<P, ResBody, ReqBody, ReqQuery> => {
  return (req, res, next) => {
    void fn(req, res, next).catch(next);
  };
};
