export interface Response<T> {
  data: T;
  message: string;
  statusCode: number;
  success: boolean;
  timeStamp: string;
}
