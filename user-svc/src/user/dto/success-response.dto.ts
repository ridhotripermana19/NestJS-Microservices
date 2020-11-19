export class SuccessResponseDto<T> {
  executedAt: string;
  message: string;
  method: string;
  data: T;
}
