import { Observable, map } from "rxjs"

import { BaseDictResponse } from "../types/dictionary.types"

export function pluckContent<T extends BaseDictResponse<any>>(): (source$: Observable<T>) => Observable<any> {
    return (source$: Observable<T>) => {
        return source$.pipe(map(response => response.content)) 
    }
}