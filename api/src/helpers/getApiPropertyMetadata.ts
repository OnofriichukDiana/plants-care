import { Type } from '@nestjs/common';
import { ApiPropertyOptions } from '@nestjs/swagger';

export function getPropMetadata(
    target: any,
    prop: string | symbol,
    metaprop: string,
) {
    return Reflect.getMetadata(metaprop, target.prototype ?? target, prop);
}

export function getApiPropertyMetadata<T, K extends keyof T>(
    objOrClass: Type<T>,
    prop: K,
): ApiPropertyOptions {
    return getPropMetadata(
        objOrClass,
        prop as string,
        'swagger/apiModelProperties',
    );
}
