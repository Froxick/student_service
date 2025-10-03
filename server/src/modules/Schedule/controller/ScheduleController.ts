import { inject, injectable } from "inversify";
import { BaseController } from "../../../common/BaseController";
import { IScheduleController } from "./ScheduleControllerInterface";
import { TYPES } from "../../../Types";
import { IScheduleService } from "../service/ScheduleServiceInterface";
import { ILogger } from "../../../logger/LogerService.interface";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../../../castomReq/castomReq";
import { ValidateReqMiddleware } from "../../../shared/middlewares/validateMiddleware";
import { ScheduleFiltersDTO } from "../dto/ScheduleFilters";
import { HttpError } from "../../../error/HTTP.error";
import { Schedule } from "../../../generated/prisma";
import { UpdateScheduleDto } from "../dto/ScheduleUpdateDto";
import { CreateScheduleDto } from "../dto/ScheduleCreateDto";

@injectable() 
export class ScheduleController extends BaseController implements IScheduleController {
    constructor(
        @inject(TYPES.ScheduleService) private service: IScheduleService,
        @inject(TYPES.LoggerService) private loggerService: ILogger
    ) {
        super(loggerService);


        this.createRoutes([
            {   
                path: '/delete/:id',
                method: 'delete',
                fnc: this.deleteSchedule,
                middleware: []
            },
            {
                path: '/get/:id',
                method: 'get',
                fnc: this.getOneSchedule,
                middleware: []
            },
            {
                path: '/get',
                method: 'get',
                fnc: this.getSchedule,
                middleware: [ValidateReqMiddleware(ScheduleFiltersDTO, 'QUERY',{ filters: true})]
            },
            {
                path: '/create',
                method: 'post',
                fnc: this.createSchedule,
                middleware: [ValidateReqMiddleware(CreateScheduleDto,'BODY')]
            },{
                path: '/createMany',
                method: 'post',
                fnc: this.createSchedule,
                middleware: [ValidateReqMiddleware(CreateScheduleDto,'BODY', {isArray: true})]
            },
             {
                path: '/update',
                method: 'post',
                fnc: this.updateSchedule,
                middleware: [ValidateReqMiddleware(UpdateScheduleDto,'BODY')]
            },
            

        ])
    }
    async getSchedule(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
        try{
            const filters = req.filters
            if(!filters) {
                throw new HttpError(400,'Фильтры не переданны')
            }
            const schedule = await this.service.getSchedule(undefined,filters) as Schedule []
            this.ok(res,{
                schedule: schedule
            })

        }catch(e){
            next(e)
        }
    }
    async getOneSchedule(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
        try{
            const id = req.params.id
            const schedule = await this.service.getSchedule(Number(id))
            this.ok(res,{
                schedule: schedule
            })
        }catch(e){
            next(e)
        }
    }
    async getFilters(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
        try{
            const filters = await this.service.getFilters()
            this.ok(res,{
                filters: filters
            })
        }catch(e){
            next(e)
        }
    }
    async createSchedule(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
        try{
            const dto = req.dto as CreateScheduleDto
           
            const newSchedule = await this.service.createShedule('one',dto)
            this.ok(res,{
                newSchedule: newSchedule
            })
           
            
        }catch(e){
            next(e)
        }
    }
    async createManySchedule(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
        try{
            const dto = req.dto as CreateScheduleDto[]
            const createdCount = await this.service.createShedule('many',dto)
            this.ok(res,{
                createdCount: createdCount
            })
        }catch(e){
            next(e)
        }
    }
    async updateSchedule(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
        try{
            const dto = req.dto as UpdateScheduleDto
            const schedule = await this.service.updateShedule(dto)
            this.ok(res,{
                schedule: schedule
            })
        }catch(e){
            next(e)
        }
    }
    async deleteSchedule(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
        try{
            const id = req.params.id
            await this.service.deleteShedule(Number(id))
            this.ok(res,{
                success: true
            })
        }catch(e){
            next(e)
        }
    }
}