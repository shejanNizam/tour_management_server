import { Response } from "express";

interface TResponse<T> {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
  total?: number;
}

export default function sendResponse<T>(res: Response, data: TResponse<T>) {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    totalData: data.total,
    data: data.data,
  });
}
