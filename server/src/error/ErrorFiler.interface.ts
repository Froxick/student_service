import { NextFunction, Request, Response } from "express";

export interface IErrorFilter {
    cath : (err: Error, req: Request, res: Response, next: NextFunction) => void;
}