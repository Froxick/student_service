import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../castomReq/castomReq";

export interface IMiddleWare {
    execute: (req: CustomRequest, res: Response, next: NextFunction) => void
}