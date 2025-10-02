import { inject, injectable } from "inversify";
import { IErrorFilter } from "./ErrorFiler.interface";
import { Request, Response, NextFunction } from "express";

import { ILogger } from "../logger/LogerService.interface";
import { HttpError } from "./HTTP.error";
import { TYPES } from "../Types";


@injectable()
export class ErrorFilter implements IErrorFilter {
    constructor(
        @inject(TYPES.LoggerService) private Logger: ILogger
    ) {

    }
    cath (err: Error, req: Request, res: Response, next: NextFunction) {
        this.Logger.error(`Ошибка ${err.message} `)
        if(err instanceof HttpError) {
            this.Logger.error(`Ошибка HttError ${err.message} ${err.statusCode} `)
            return res.status(err.statusCode).json({
                error: {
                    message: err.message,
                    status: err.statusCode,
                    details: err.details
                }
            })
        }
        res.status(500).json({
            error: {
                message: 'Internal Server Error',
                status: 500
            }
        });
    }
}