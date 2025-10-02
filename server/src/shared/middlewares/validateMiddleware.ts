import { NextFunction, Request, RequestHandler, Response } from "express"


import { HttpError } from "../../error/HTTP.error";
import { CustomRequest, CustomRequestHandler } from "../../castomReq/castomReq";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export type reqSorceT  = 'BODY' | 'QUERY'

export function ValidateReqMiddleware<T extends ClassConstructor<object>>(dtoClass: T, reqSorce : reqSorceT, filters?: boolean) : CustomRequestHandler {
    
    return async (req: CustomRequest, res: Response, next: NextFunction) => {
        try{
            if(filters && reqSorce === 'QUERY') {
                const hasQeryParams = Object.keys(req.query).length > 0
                if(!hasQeryParams){
                    return next()
                }
            }
            const dtoTransform = reqSorce === 'BODY' ? plainToInstance(dtoClass,req.body) : plainToInstance(dtoClass, req.query) 
            
            const error_list = await validate(dtoTransform)
            if(error_list.length > 0) {
                    const errorMessage = error_list.map(err => ({
                    field: err.property,
                    message: Object.values(err.constraints ?? {})[0] || 'Ошибка валидации'
                }))
                return next(new HttpError(400,'Ошибка при валидации', errorMessage))
            }
           if(!filters) {
            req.dto = dtoTransform
           } else{
            req.filters = dtoTransform
           }
            next()
        }catch(e){
            next(e)
        }
    }
}