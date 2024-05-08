import { Injectable } from '@angular/core';

import { Selector, State } from '@ngxs/store';

import { FORM_STATUS } from '@shared/consts';
import { FormsStateModel } from './forms.types';

const defaults: FormsStateModel = {
  groupForm: {
    model: undefined,
    dirty: false,
    status: '',
    errors: {},
  },
  nestedForm: {
    model: undefined,
    dirty: false,
    status: '',
    errors: {},
  },
};

@State<FormsStateModel>({
  name: 'forms',
  defaults
})
@Injectable()
export class FormsState {
  @Selector()
  public static isFormValid(state: FormsStateModel) {
    return (tab: number) => {
      switch (tab) {
        case 1:
          return state.groupForm.status === FORM_STATUS.VALID;
        case 2:
          return state.nestedForm.status === FORM_STATUS.VALID;
        default:
          return false;
      }
    }
  }

  @Selector()
  public static countryOfRegistration(state: FormsStateModel) {
    return state.groupForm.model?.testAutocomplete;
  }
}
