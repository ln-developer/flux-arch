import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Observable, Subject, filter, takeUntil } from 'rxjs';

import { Select, Store } from '@ngxs/store';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { UsersState } from '../../../../store/user/user.state';
import { User } from '../../../utils/types/external-api.types';
import { GetUser, GetUsers } from '../../../../store/user/user.actions';

const core = [
  AsyncPipe,
  FormsModule,
  ReactiveFormsModule,
  JsonPipe,
]

const material = [
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
]

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    material,
    core,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Select(UsersState.entities<User>())
  public usersList$!: Observable<User[]>;

  public readonly selectedUser = new FormControl<User | null>(null);

  private readonly _unscubscribe$ = new Subject<void>();

  constructor(private readonly store: Store) {
    // ATTENTION!
    // берем снимок состояния
    // так как получение юзера проходит при инициализации апы, то 100% юезр к этому моменту будет
    this.selectedUser.setValue(this.store.selectSnapshot(state => state.users.entity));
    this.store.dispatch(new GetUsers());
  }

  public ngOnInit(): void {
    this.selectedUser.valueChanges
      .pipe(takeUntil(this._unscubscribe$))
      .pipe(filter(user => !!user))
      .subscribe(user => this.store.dispatch(new GetUser(user?.id)));
  }

  public getUserById(id?: number): void {
    this.store.dispatch(new GetUser(id));
  }

  public compareFn(object1: User, object2: User): boolean {
    return object1 && object2 && object1.id === object2.id;
  }

  public ngOnDestroy(): void {
    this._unscubscribe$.next();
    this._unscubscribe$.complete();
  }
}
