import { Observable, map } from "rxjs"

import { BaseDaDataResponse } from "../types/dadata.types"

export function pluckSuggestions<T extends BaseDaDataResponse<any>>(): (source$: Observable<T>) => Observable<any> {
    return (source$: Observable<T>) => {
        return source$.pipe(map(response => response.suggestions)) 
    }
}