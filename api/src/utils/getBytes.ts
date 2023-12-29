export const isEmpty = (val: any) => val === null || typeof val === 'undefined';

const BYTES_CONST = 1024;

type Format = 'kb' | 'mb' | 'gb';

export function getBytes(value: number, format: Format) {
    const powers: Record<Format, number> = {
        kb: 1,
        mb: 2,
        gb: 3,
    };
    return value * BYTES_CONST ** powers[format];
}

export function all<Item, Response = void>(
    iterable: Iterable<Item>,
    cb: (i: Item) => Promise<Response>,
) {
    const promises = [];

    for (const item of iterable) {
        promises.push(cb(item));
    }

    return Promise.all(promises);
}
