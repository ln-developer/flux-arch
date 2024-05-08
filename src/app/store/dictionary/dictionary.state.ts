import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { tap } from 'rxjs';

import { Dictionary } from './dictionary.actions';
import { DictionaryService } from '../../shared/utils/services/dictionary.service';
import { CountryDictContent, KeyDictContent } from '../../shared/utils/types/dictionary.types';
import { FormsState } from 'src/app/forms/store/forms.state';
import { FormsStateModel } from 'src/app/forms/store/forms.types';

export interface DictionaryStateModel {
  vehicleCategory: Array<string>;
  placeOfRegistration: Array<KeyDictContent<number>>;
  country: Array<CountryDictContent>;
  vehiclePurpose: Array<KeyDictContent<number>>;
  vehicleDocType: Array<KeyDictContent<number>>;
}

const defaults: DictionaryStateModel = {
  vehicleCategory: [],
  placeOfRegistration: [],
  country: [],
  vehiclePurpose: [],
  vehicleDocType: [],
};

@State<DictionaryStateModel>({
  name: 'dictionary',
  defaults
})
@Injectable()
export class DictionaryState {
  // @Selector([FormsState])
  // public static filteredCountryList(state: DictionaryStateModel, formsState: FormsStateModel) {
  //   const countryOfRegistration = formsState.groupForm.model?.testAutocomplete ?? '';
  //   const strLower = typeof countryOfRegistration === 'string'
  //     ? countryOfRegistration.toLowerCase()
  //     : countryOfRegistration.name.toLowerCase();
  //   return state.country.filter(option => option.name.toLowerCase().includes(strLower));
  // }

  @Selector([FormsState.countryOfRegistration])
  public static filteredCountryList(state: DictionaryStateModel, countryOfRegistration: CountryDictContent | string) {
    const strLower = typeof countryOfRegistration === 'string'
      ? countryOfRegistration.toLowerCase()
      : countryOfRegistration.name.toLowerCase();
    return state.country.filter(option => option.name.toLowerCase().includes(strLower));
  }

  constructor(private readonly dictionary: DictionaryService) {}

  @Action(Dictionary.GetVehicleCategory)
  public getVehicleCategoryList(ctx: StateContext<DictionaryStateModel>) {
    return this.dictionary.getVehicleCategoryList()
      .pipe(tap(vehicleCategory => {
        ctx.setState(state => ({ ...state, vehicleCategory }))
      }))
  }

  @Action(Dictionary.GetPlaceOfRegistartion)
  public getPlaceOfRegistartionList(ctx: StateContext<DictionaryStateModel>) {
    return this.dictionary.getPlaceOfRegistartionList()
      .pipe(tap(placeOfRegistration => {
        ctx.setState(state => ({ ...state, placeOfRegistration }))
      }))
  }

  @Action(Dictionary.GetCountry)
  public getCountryList(ctx: StateContext<DictionaryStateModel>) {
    return this.dictionary.getCountryList()
      .pipe(tap(country => {
        ctx.setState(state => ({ ...state, country }))
      }))
  }

  @Action(Dictionary.GetVehiclePurpose)
  public getVehiclePurposeList(ctx: StateContext<DictionaryStateModel>) {
    return this.dictionary.getVehiclePurposeList()
      .pipe(tap(vehiclePurpose => {
        ctx.setState(state => ({ ...state, vehiclePurpose }))
      }))
  }

  @Action(Dictionary.GetVehicleDocType)
  public getVehicleDocTypeList(ctx: StateContext<DictionaryStateModel>) {
    return this.dictionary.getVehicleDocTypeList()
      .pipe(tap(vehicleDocType => {
        ctx.setState(state => ({ ...state, vehicleDocType }))
      }))
  }
}
