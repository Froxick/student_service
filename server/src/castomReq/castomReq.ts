import { NextFunction, Request, Response } from "express";
import { ScheduleFiltersDTO } from "../modules/Schedule/dto/ScheduleFilters";

export interface CustomRequest extends Request {
  dto: any;
  filters?: ScheduleFiltersDTO
}
export type CustomRequestHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => void;