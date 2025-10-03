import { NextFunction, Response } from "express";
import { CustomRequest } from "../../../castomReq/castomReq";

export interface IScheduleController {
    getSchedule (req: CustomRequest,res: Response, next: NextFunction) : Promise<void>
    getOneSchedule (req: CustomRequest, res: Response, next: NextFunction) : Promise<void>
    createSchedule (req: CustomRequest, res: Response,next: NextFunction) : Promise<void>
    createManySchedule (req: CustomRequest, res: Response, next: NextFunction) : Promise<void>
    deleteSchedule (req: CustomRequest, res: Response,next: NextFunction) : Promise<void>
    updateSchedule (req: CustomRequest, res: Response,next: NextFunction) : Promise<void>
    getFilters (req: CustomRequest, res: Response,next: NextFunction) : Promise<void>
}