import { NextFunction, Request, RequestHandler, Response } from "express"


import { HttpError } from "../../error/HTTP.error";
import { CustomRequest, CustomRequestHandler } from "../../castomReq/castomReq";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export type reqSorceT  = 'BODY' | 'QUERY'

export function ValidateReqMiddleware<T extends ClassConstructor<object>>(dtoClass: T, reqSorce : reqSorceT, options?: {
    filters?: boolean,
    isArray? : boolean
}) : CustomRequestHandler {
    
    return async (req: CustomRequest, res: Response, next: NextFunction) => {
        try{
            const {filters = false, isArray = false} = options || {}
            if(filters && reqSorce === 'QUERY') {
                const hasQeryParams = Object.keys(req.query).length > 0
                if(!hasQeryParams){
                    return next()
                }
            }
            let dataToValidate: any;
            let validationTarget: any;

             if (reqSorce === 'BODY') {
                dataToValidate = req.body;
                validationTarget = isArray ? 'body array' : 'body';
            } else {
                dataToValidate = req.query;
                validationTarget = isArray ? 'query array' : 'query';
            }
            if(isArray && !Array.isArray(dataToValidate)) {
                return next(new HttpError(
                    400, 'Данные не являются массивом'
                ))
            }
            const dtoTransform = isArray ?
                plainToInstance(dtoClass,dataToValidate as []) :
                plainToInstance(dtoClass,dataToValidate)
           
            let errorList : ValidationError[]
            if(isArray) {
                const validationPromise = (dtoTransform as []).map((item: any) => validate(item))
                const validateResult = await Promise.all(validationPromise)
                errorList = validateResult.flat()
            } else {
                errorList = await validate(dtoTransform);
            }
             if (errorList.length > 0) {
                const errorMessage = errorList.map(err => ({
                    field: err.property,
                    message: Object.values(err.constraints ?? {})[0] || 'Ошибка валидации'
                }));
                return next(new HttpError(400, 'Ошибка при валидации', errorMessage));
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