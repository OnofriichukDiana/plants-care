import { ClassConstructor, plainToClass } from 'class-transformer';

export function transform<T, VT extends T, V extends VT | VT[]>(
    cls: ClassConstructor<T>,
    value: V,
    options?: Parameters<typeof plainToClass>[2],
): V extends Array<any> ? T[] : T {
    // @ts-ignore
    return plainToClass(cls, value, {
        strategy: 'excludeAll',
        enableImplicitConversion: true,
        exposeDefaultValues: true,
        ...options,
    });
}
