export interface FormModel<T> {
    model: undefined | T;
    dirty: boolean,
    status: string,
    errors: { [key: string]: unknown; },
}