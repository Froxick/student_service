
import { inject, injectable } from "inversify";

import { ILogger } from "../logger/LogerService.interface";
import { PrismaClient } from "../generated/prisma";
import { TYPES } from "../Types";


@injectable()
export class PrismaService {
    client: PrismaClient

    constructor(
        @inject(TYPES.PrismaService) private Logger : ILogger 
    ) {
        this.client = new PrismaClient()
    }

    public async connect () {
        try{
            await this.client.$connect()
            this.Logger.log('[PrismaService] База данных подключена')
        }catch(e){
            if(e instanceof Error) {
                this.Logger.error('[PrismaService] Ошибка при подключении к базе данных', e.message)
            }
        }
    }
    public async disconnect () {
        await this.client.$disconnect()
    }
}