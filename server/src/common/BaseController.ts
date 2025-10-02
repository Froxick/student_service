import {  RequestHandler, Response, Router } from "express";
import { ILogger } from "../logger/LogerService.interface";
import { IRoute } from "./routeInterface";
import { CustomRequestHandler } from "../castomReq/castomReq";
export function adaptMiddleware(customMiddleware: CustomRequestHandler): RequestHandler {
  return (req, res, next) => {
    
    const customReq = req as any;
    customMiddleware(customReq, res, next);
  };
}
export abstract class BaseController {
    private _router: Router

    constructor(
        private logger: ILogger
    ) {
        this._router = Router()
    }

    get router() {
        return this._router
    }
    set router(router: Router) {
        this._router = router
    }

    public send<T>(res: Response, code: number, message: T) {
        res.type('application/json')
        return res.status(code).json(message)
    }
    
    public ok<T>(res: Response, message: T) {
        return this.send(res, 201, message)
    }
    
    public create(res: Response) {
        return res.sendStatus(200)
    }

    protected createRoutes(routes: IRoute[]) {
        for (const route of routes) {
            this.logger.log(`Маршрут - [${route.path}], метод - [${route.method}]`)
            const middlewares: RequestHandler[] = []
            
            if (route.middleware) {
                for (const mw of route.middleware) {
                    if (typeof mw === 'function') {
                        
                        middlewares.push(adaptMiddleware(mw as CustomRequestHandler));
                    } else {
                       
                        const adaptedHandler = adaptMiddleware(mw.execute.bind(mw) as CustomRequestHandler);
                        middlewares.push(adaptedHandler);
                    }
                }
            }
            
         
            const adaptedHandler = adaptMiddleware(route.fnc.bind(this) as CustomRequestHandler);
            const pipeline: RequestHandler[] = [...middlewares, adaptedHandler];
            
            this._router[route.method](route.path, pipeline);
        }
    }
}