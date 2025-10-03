import { Server } from "http";
import { inject, injectable } from "inversify";
import express, { Express } from 'express';
import { ILogger } from "../logger/LogerService.interface";
import { json } from "body-parser";
import qs from 'qs';
import cors from 'cors';
import { IErrorFilter } from "../error/ErrorFiler.interface";
import { TYPES } from "../Types";
import { ScheduleController } from "../modules/Schedule/controller/ScheduleController";
@injectable()
export class App {
    app: Express
    port: number
    server: Server

    constructor(
        @inject(TYPES.LoggerService) private logger: ILogger,
        @inject(TYPES.ErrorFilter) private errorFilter: IErrorFilter,
        @inject(TYPES.ScheduleController) private ScheduleController : ScheduleController
    ) {
        this.port = 3000
        this.app = express()
        
    }
     public useRoutes () {
        this.app.use('/schedule',this.ScheduleController.router)
     }
     public useErrorFilter () {
        this.app.use(this.errorFilter.cath.bind(this.errorFilter))
     }
     public useMiddleware () {

        this.app.use(cors({
            origin: '*', 
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
        this.app.set('query parser', (str: string) => {
        return qs.parse(str, { 
            allowDots: true, 
            arrayLimit: 1000, 
            depth: 10 
        });
    });
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(json())
    }
    public init() {
       this.useMiddleware()
       this.useRoutes()
       this.useErrorFilter()
       this.server = this.app.listen(this.port)
       this.logger.log('Сервер запущен на порту  - ', this.port)
    }
}