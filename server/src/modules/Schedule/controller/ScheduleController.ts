import { inject, injectable } from "inversify";
import { BaseController } from "../../../common/BaseController";
import { IScheduleController } from "./ScheduleControllerInterface";
import { TYPES } from "../../../Types";
import { IScheduleService } from "../service/ScheduleServiceInterface";
import { ILogger } from "../../../logger/LogerService.interface";

@injectable() 
export class ScheduleController extends BaseController implements IScheduleController {
    constructor(
        @inject(TYPES.ScheduleService) private service: IScheduleService,
        @inject(TYPES.LoggerService) private loggerService: ILogger
    ) {
        super(loggerService);


        this.createRoutes([
            
        ])
    }
}