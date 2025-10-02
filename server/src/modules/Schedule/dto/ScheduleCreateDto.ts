import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsString, Length, Matches, Max, Min } from "class-validator";

export class CreateScheduleDto {
 @IsNotEmpty({ message: 'Название группы обязательно' })
  @IsString({ message: 'Название группы должно быть строкой' })
  @Length(3, 100, { message: 'Название группы должно быть от 3 до 100 символов' })
  groupName: string;

  @IsNotEmpty({ message: 'Дата обязательна' })
  @IsDateString({}, { message: 'Неверный формат даты' })
  date: Date;

  @IsNotEmpty({ message: 'Время начала обязательно' })
  @IsString({ message: 'Время начала должно быть строкой' })
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { 
    message: 'Время начала должно быть в формате HH:MM (24-часовой формат)' 
  })
  startTime: string;

  @IsNotEmpty({ message: 'Время окончания обязательно' })
  @IsString({ message: 'Время окончания должно быть строкой' })
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { 
    message: 'Время окончания должно быть в формате HH:MM (24-часовой формат)' 
  })
  endTime: string;

  @IsNotEmpty({ message: 'Номер занятия обязателен' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Номер занятия должен быть числом' })
  @Min(1, { message: 'Номер занятия не может быть меньше 1' })
  @Max(7, { message: 'Номер занятия не может быть больше 7' })
  lessonNumber: number;

  @IsNotEmpty({ message: 'Аудитория обязательна' })
  @IsString({ message: 'Аудитория должна быть строкой' })
  @Length(1, 50, { message: 'Аудитория должна быть от 1 до 50 символов' })
  classroom: string;

  @IsNotEmpty({ message: 'Преподаватель обязателен' })
  @IsString({ message: 'Преподаватель должен быть строкой' })
  @Length(1, 200, { message: 'Имя преподавателя должно быть от 1 до 200 символов' })
  teacher: string;

  @IsNotEmpty({ message: 'Дисциплина обязательна' })
  @IsString({ message: 'Дисциплина должна быть строкой' })
  @Length(1, 200, { message: 'Название дисциплины должно быть от 1 до 200 символов' })
  discipline: string;
}