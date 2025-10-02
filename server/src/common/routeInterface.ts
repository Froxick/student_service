import { NextFunction, Request, Response, Router } from "express";
import { IMiddleWare } from "./middleWareInterface";
import { CustomRequest } from "../castomReq/castomReq";


export interface IRoute {
    path: string,
    fnc: (req: CustomRequest,res: Response, next: NextFunction) => void,
    method: keyof Pick<Router,'post' | 'get' | 'delete' | 'put' | 'patch'>,
    middleware?: IMiddleWare[] | any[]
}