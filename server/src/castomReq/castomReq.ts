import { NextFunction, Request, Response } from "express";

export interface CustomRequest extends Request {
  dto: any;
  user: {
    email: string;
    id: string;
    name: string;
  };
  filters?: {
    startDate?: Date;
    endDate?: Date;
  }
}
export type CustomRequestHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => void;