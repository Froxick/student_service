import { Type } from "class-transformer";
import { IsDateString, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class ScheduleFiltersDTO {
    @IsOptional()
    @IsString({ message: 'Название группы должно быть строкой' })
    groupName?: string;
    @IsOptional()
    @IsString({ message: 'ФИО преподавателя должно быть строкой' })
    teacher?: string;
    @IsOptional()
    @IsDateString({},{message: 'Не верный формат даты'})
    startDate?: Date;
    @IsOptional()
    @IsDateString({},{message: 'Не верный формат даты'})
    endDate?: Date;
    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'Смещение недели должно быть целым числом' })
    @Min(-52, { message: 'Смещение недели не может быть меньше -52' })
    @Max(52, { message: 'Смещение недели не может быть больше 52' })
    weekOffset?: number;
}