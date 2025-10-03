import { Container, ContainerModule } from "inversify";
import { App } from "./app";
import { ILogger } from "../logger/LogerService.interface";
import { LoggerService } from "../logger/Logger.service";
import { IErrorFilter } from "../error/ErrorFiler.interface";
import { ErrorFilter } from "../error/ErrorFilter";
import { TYPES } from "../Types";
import { IScheduleRepository } from "../modules/Schedule/repository/ScheduleRepositoryInterface";
import { ScheduleRepository } from "../modules/Schedule/repository/ScheduleRepository";
import { IScheduleService } from "../modules/Schedule/service/ScheduleServiceInterface";
import { ScheduleService } from "../modules/Schedule/service/ScheduleService";


const appBindContainer = new ContainerModule((bind) => {

    bind.bind<ILogger>(TYPES.LoggerService).to(LoggerService).inSingletonScope(),
    bind.bind<IErrorFilter>(TYPES.ErrorFilter).to(ErrorFilter).inSingletonScope(),
    bind.bind<IScheduleRepository>(TYPES.SheduleRepository).to(ScheduleRepository).inSingletonScope(),
    bind.bind<IScheduleService>(TYPES.ScheduleService).to(ScheduleService).inSingletonScope()
    bind.bind<App>(TYPES.App).to(App).inSingletonScope()
   
})


const startServer = () => {
    const appContainer = new Container()
    appContainer.load(appBindContainer)
    const app = appContainer.get<App>(TYPES.App)
    app.init()
    return{
        appContainer,app
    }
}

startServer()
