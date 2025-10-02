import { Schedule } from "../../../generated/prisma";
import { CreateScheduleDto } from "../dto/ScheduleCreateDto";
import { ScheduleFiltersDTO } from "../dto/ScheduleFilters";
import { UpdateScheduleDto } from "../dto/ScheduleUpdateDto";

export interface IScheduleRepository {
    createOne (data: CreateScheduleDto) : Promise<Schedule>
    updateOne (data: UpdateScheduleDto) : Promise<Schedule>
    getMany (filters: ScheduleFiltersDTO) : Promise<Schedule[]>
    getOne (id: number) : Promise<Schedule | null>
    deleteOne (id: number) : Promise<void>
    getGroups () : Promise<{groupName: string}[]>
    getTeachers () : Promise<{teacher: string}[]>
}