import { FindManyOptions } from 'typeorm';

export class FindAllUserOptionsDto<T> implements FindManyOptions<T> {}
