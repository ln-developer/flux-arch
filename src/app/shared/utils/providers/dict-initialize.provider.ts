import { Provider } from "@angular/core";

import { Store } from "@ngxs/store";

import { Observable, map } from "rxjs";

import { DICTIONARY } from "../consts/dictionary.consts";
import { Dictionary } from "../../../store/dictionary/dictionary.actions";
import { DICT_INITIALIZE, DICT_LIST } from "../tokens/dict-initialize.token";

function dictInitializingFactory(
    dictList: Array<DICTIONARY>,
    store: Store,
): Observable<boolean> {    
    return store.dispatch(dictList?.map(dict => dictActionFactory(dict)))
        .pipe(map(_ => true));
}

type Union = 
    | Dictionary.GetVehicleCategory 
    | Dictionary.GetPlaceOfRegistartion
    | Dictionary.GetCountry
    | Dictionary.GetVehiclePurpose
    | Dictionary.GetVehicleDocType;

function dictActionFactory(dictName: DICTIONARY): Union {
    switch (dictName) {
        case DICTIONARY.VEHICLE_CATEGORY:
            return new Dictionary.GetVehicleCategory();
        case DICTIONARY.PLACE_OF_REGISTRACTION:
            return new Dictionary.GetPlaceOfRegistartion();
        case DICTIONARY.COUNTRY:
            return new Dictionary.GetCountry();
        case DICTIONARY.VEHICLE_PURPOSE:
            return new Dictionary.GetVehiclePurpose();
        case DICTIONARY.VEHICLE_DOC_TYPE:
            return new Dictionary.GetVehicleDocType();
    }
}

export function dictInitializingProvider(): Provider {    
    return {
        provide: DICT_INITIALIZE,
        deps: [DICT_LIST, Store],
        useFactory: dictInitializingFactory,
    }
} 