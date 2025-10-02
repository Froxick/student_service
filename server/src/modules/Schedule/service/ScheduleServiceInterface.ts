import { Schedule } from "../../../generated/prisma"
import { CreateScheduleDto } from "../dto/ScheduleCreateDto"
import { ScheduleFiltersDTO } from "../dto/ScheduleFilters"
import { UpdateScheduleDto } from "../dto/ScheduleUpdateDto"

export interface IScheduleService {
    getFilters () : Promise<GetFilters>
    getSchedule (filters: ScheduleFiltersDTO, id: number): Promise<Schedule[] | Schedule | null> 
    createShedule (data: CreateScheduleDto) : Promise<Schedule>
    updateShedule (data: UpdateScheduleDto) : Promise<Schedule>
    deleteShedule (id: number) : Promise<void>

}
export interface GetFilters {
    groupNames: {groupName: string}[],
    teachers: {teacher: string}[]
}