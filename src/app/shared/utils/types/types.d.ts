import { FormControl } from "@angular/forms";

declare global {
    type Nullable<T> = {
        [P in keyof T]: T[P] | null;
    };

    type NonNullableFormType<T> = {
        [P in keyof T]: FormControl<T[P]>;
    };

    type FormType<T> = NonNullableFormType<Nullable<T>>;
}

export {};