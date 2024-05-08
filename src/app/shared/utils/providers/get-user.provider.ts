import { APP_INITIALIZER, Provider } from '@angular/core';

import { take } from 'rxjs';

import { Actions, Store, ofActionSuccessful } from '@ngxs/store';

import { GetUser } from '../../../store/user/user.actions';

function userFactory(store: Store, actions$: Actions) {
  return () => new Promise(resolve => {
    store.dispatch(new GetUser());
    
    actions$.pipe(ofActionSuccessful(GetUser))
      .subscribe(() => resolve(true));
  }) 
}

export function getUserProvider(): Provider {
  return {
    provide: APP_INITIALIZER,
    deps: [Store, Actions],
    useFactory: userFactory,
    multi: true,
  }
}
