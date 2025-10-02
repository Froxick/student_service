import { injectable } from "inversify";
import { ILogger } from "./LogerService.interface";
import { ILogObj, Logger } from 'tslog'
@injectable()
export class LoggerService implements ILogger{
    public logger: Logger<ILogObj>;
    constructor () {
        this.logger = new Logger<ILogObj>({})
        
    }
    log(...args: unknown[]) : void {
        this.logger.info(...args);
    }
    warn (...args: unknown[]) : void{ 
        this.logger.warn(...args);
    }
    error (...args: unknown[]) : void {
        this.logger.error(...args);
    }
}