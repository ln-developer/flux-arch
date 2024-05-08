import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, JsonPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

import { Select, Store } from '@ngxs/store';

import { MainState } from './store/main.state';
import { Post, User } from '../shared/utils/types/external-api.types';
import { GetPosts } from './store/main.actions';
import { UserStateModel, UsersState } from '../store/user/user.state';

const core = [
  FormsModule,
  ReactiveFormsModule,
  AsyncPipe,
  JsonPipe,
]

const material = [
  MatFormFieldModule,
  MatSelectModule,
  MatCardModule,
]

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    core,
    material,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  // Весь стейт типа UsersState
  @Select(UsersState)
  public usersState$!: Observable<UserStateModel>;

  // Через функцию
  @Select((state: { users: UserStateModel }) => state.users.entities)
  public users$!: Observable<User[]>;

  // С помощью селектора
  @Select(UsersState.userIds)
  public userIds$!: Observable<number[]>;



  @Select(MainState.getPostsList)
  public getPostsList$!: Observable<(userId: number) => Post[]>; 

  public readonly control = new FormControl(null);

  public readonly userControl = new FormControl(null);

  constructor(private readonly store: Store) {
    this.store.dispatch(new GetPosts());
  }

  public ngOnInit(): void {
    
  }
}
