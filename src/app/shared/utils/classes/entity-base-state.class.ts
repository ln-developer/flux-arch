import { createSelector } from '@ngxs/store';

export class EntityState {
  static entitie<T>() {
    return createSelector([this], (state: { entitie: T }) => {
      return state.entitie;
    });
  }

  static entities<T>() {
    return createSelector([this], (state: { entities: T[] }) => {      
      return state.entities;
    });
  }
}
