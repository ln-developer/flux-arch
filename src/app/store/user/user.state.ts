import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';

import { tap } from 'rxjs';

import { GetUser, GetUsers } from './user.actions';
import { User } from '../../shared/utils/types/external-api.types';
import { ExternalApiService } from '../../shared/utils/services/external-api.service';
import { EntityState } from '../../shared/utils/classes/entity-base-state.class';

export interface UserStateModel {
  entity: User | null;
  entities: User[];
}

const defaults: UserStateModel = {
  entity: null,
  entities: [],
};

@State<UserStateModel>({
  name: 'users',
  defaults
})
@Injectable()
export class UsersState extends EntityState {
  @Selector()
  public static userIds(state: UserStateModel) {
    return Array.from(new Set(state.entities.map(entity => entity.id)));
  }

  constructor(private readonly external: ExternalApiService) {
    super();
  }

  @Action(GetUser)
  public getUserInfo(ctx: StateContext<UserStateModel>, { userId }: GetUser) {
    return this.external.getUserInfo(userId)
      .pipe(tap(entity => {
        ctx.setState(state => ({ ...state, entity }))
      }))
  }

  @Action(GetUsers)
  public getUsersList(ctx: StateContext<UserStateModel>) {
    return this.external.getUsers()
      .pipe(tap(entities => {
        ctx.setState(state => ({ ...state, entities }))
      }))
  }
}
