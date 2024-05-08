import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { tap } from 'rxjs';

import { MainStateModel } from './main.types';
import { GetPosts } from './main.actions';
import { ExternalApiService } from '../../shared/utils/services/external-api.service';

const defaults: MainStateModel = {
  posts: [],
};

@State<MainStateModel>({
  name: 'main',
  defaults,
})
@Injectable()
export class MainState {
  @Selector()
  public static getPostsList(state: MainStateModel) {
    return (userId: number) => {      
      if (!userId) return state.posts;

      return state.posts.filter(post => post.userId === userId)
    };
  }

  constructor(private readonly external: ExternalApiService) {}

  @Action(GetPosts)
  public getPosts(ctx: StateContext<MainStateModel>) {
    return this.external.getPosts()
      .pipe(tap(posts => {
        ctx.setState(state => ({ ...state, posts }))
      }))
  }
}
