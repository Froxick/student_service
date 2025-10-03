import { inject, injectable } from "inversify";
import { TYPES } from "../../../Types";
import { PrismaService } from "../../../db/prismaService";
import { IScheduleRepository } from "./ScheduleRepositoryInterface";
import { Schedule } from "../../../generated/prisma";
import { CreateScheduleDto } from "../dto/ScheduleCreateDto";
import { UpdateScheduleDto } from "../dto/ScheduleUpdateDto";
import { ScheduleFiltersDTO } from "../dto/ScheduleFilters";
import { ILogger } from "../../../logger/LogerService.interface";
import { HttpError } from "../../../error/HTTP.error";

@injectable()
export class ScheduleRepository implements IScheduleRepository {
    constructor(
        @inject(TYPES.PrismaService) private prisma: PrismaService,
        @inject(TYPES.LoggerService) private logger: ILogger
    ) {
        
    }
   async createMany(data: CreateScheduleDto[]): Promise<{count: number}> {
        try{    
            const schedule = await this.prisma.client.schedule.createMany({
                data: data
            })
            return schedule;
        }catch(e){
            throw new HttpError(500,'Ошибка при создании записей')
        }
   }
   async createOne(data: CreateScheduleDto): Promise<Schedule> {
       try{
            const newSchedule = await this.prisma.client.schedule.create({
                data: data
            })
            return newSchedule
       }catch(e){
         this.logger.error('Ошибка при создании записи [ScheduleRep] [createOne]',e)
         throw new HttpError(500,'Ошибка при создании записи')
       }
   }
   async updateOne(data: UpdateScheduleDto): Promise<Schedule> {
        try{
            const updateSchedule = await this.prisma.client.schedule.update({
                where: {
                    id: data.id
                },
                data: data
            })
            return updateSchedule
        }catch(e){
            this.logger.error('Ошибка при обновлении записи [ScheduleRep] [updateOne]',e)
            throw new HttpError(500,'Ошибка при обновлении записи')
        }
   }
   async deleteOne(id: number): Promise<void> {
       try{
            await this.prisma.client.schedule.delete({
                where: {
                    id: id
                }
            })
       }catch(e){
            this.logger.error('Ошибка при удалении записи [ScheduleRep] [deleteOne]',e)
            throw new HttpError(500,'Ошибка при удалении записи')
       }
   }
   async getOne(id: number): Promise<Schedule| null> {
       try{
        const findSchedule = await this.prisma.client.schedule.findFirst({
            where: {
                id: id
            }
        })
        return findSchedule;

       }catch(e){
            this.logger.error('Ошибка при запросе записи [ScheduleRep] [getOne]',e)
            throw new HttpError(500,'Ошибка при запросе записи')
       }
   }
   async getMany(filters: ScheduleFiltersDTO): Promise<Schedule[]> {
       try{
            const { groupName, teacher, startDate, endDate, weekOffset = 0 } = filters;
            const now = new Date();
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay() + (weekOffset * 7));
            startOfWeek.setHours(0, 0, 0, 0);
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999);


            const where: any = {};
            if(groupName) {
                where.groupName = groupName
            }
            if(teacher) {
                where.teacher = teacher
            }
            where.date = {
                gte: startDate || startOfWeek,
                lte: endDate || endOfWeek,
            };
            return this.prisma.client.schedule.findMany({
                where,
                orderBy: [
                    {date:'asc'},
                    {lessonNumber: 'asc'}
                ]
            })
       }catch(e){
            this.logger.error('Ошибка при запросе записей [ScheduleRep] [getMany]',e)
            throw new HttpError(500,'Ошибка при запросе записей')
       }



       
   }   
   async getGroups() {
    try{
        const groups = await this.prisma.client.schedule.findMany({
        distinct: ['groupName'],
        select: {
            groupName: true,
        },
        orderBy: {
            groupName: 'asc',
        },
        });
        return groups
    }catch(e){
        throw new HttpError(500,'Ошибка сервера')
    }
   
  }

  
  async getTeachers() {
    try{
        const teachers = await this.prisma.client.schedule.findMany({
        distinct: ['teacher'],
        select: {
            teacher: true,
        },
        orderBy: {
            teacher: 'asc',
        },
        });
        return teachers;
    }catch(e){
        throw new HttpError(500,'Ошибка сервера')
    }
    
  }


}