export class CreateScheduleDto {
  groupName: string;
  date: Date;
  startTime: string;
  endTime: string;
  lessonNumber: number;
  classroom: string;
  teacher: string;
  discipline: string;
}