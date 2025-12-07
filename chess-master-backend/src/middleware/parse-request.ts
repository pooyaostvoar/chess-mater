import { Request, Response, NextFunction } from "express";

type Parser = {
  parse: (input: any) => any;
};

type ParseMiddlewareOptions = {
  bodyParser?: Parser;
  queryParser?: Parser;
  paramParser?: Parser;
};

export const parseRequest =
  ({ bodyParser, queryParser, paramParser }: ParseMiddlewareOptions) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (bodyParser) {
        req.body = bodyParser.parse(req.body);
      }

      if (queryParser) {
        req.query = queryParser.parse(req.query);
      }

      if (paramParser) {
        req.params = paramParser.parse(req.params);
      }

      next();
    } catch (err) {
      return res.status(400).json({
        error: "Invalid request data",
        details: err,
      });
    }
  };
