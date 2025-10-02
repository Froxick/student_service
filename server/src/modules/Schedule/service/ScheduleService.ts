import { inject, injectable } from "inversify";
import { GetFilters, IScheduleService } from './ScheduleServiceInterface';
import { Schedule } from "../../../generated/prisma";
import { CreateScheduleDto } from "../dto/ScheduleCreateDto";
import { UpdateScheduleDto } from "../dto/ScheduleUpdateDto";
import { ScheduleFiltersDTO } from "../dto/ScheduleFilters";
import { TYPES } from "../../../Types";
import { IScheduleRepository } from "../repository/ScheduleRepositoryInterface";

@injectable()
export class ScheduleService implements IScheduleService {
    constructor(
        @inject(TYPES.SheduleRepository) private repository : IScheduleRepository
    ) {

    }
    async createShedule(data: CreateScheduleDto): Promise<Schedule> {
        return await this.repository.createOne(data)        
    }
    async updateShedule(data: UpdateScheduleDto): Promise<Schedule> {
        return await this.updateShedule(data)
    }
    async deleteShedule(id: number): Promise<void> {
        await this.repository.deleteOne(id);
    }
    async getSchedule(id?: number,filters?: ScheduleFiltersDTO,): Promise<Schedule[] | Schedule | null> {
        if(id) {
            return await this.repository.getOne(id);
        } 
        return await this.repository.getMany(filters as ScheduleFiltersDTO);
    
    }
    async getFilters(): Promise<GetFilters> {
        const groupsFilters = await this.repository.getGroups()
        const teacherFilters = await this.repository.getTeachers()
        const filters : GetFilters = {
            groupNames: groupsFilters,
            teachers: teacherFilters
        }
        return filters
    }
}