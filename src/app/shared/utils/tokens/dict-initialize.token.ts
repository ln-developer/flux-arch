import { InjectionToken } from "@angular/core"

import { Observable } from "rxjs"

import { DICTIONARY } from "../consts/dictionary.consts"

export const DICT_INITIALIZE = new InjectionToken<Observable<boolean>>(
    'A stream with dictionary initializing flag'
)

export const DICT_LIST = new InjectionToken<Array<DICTIONARY>>(
    'Array with dictionary list'
)