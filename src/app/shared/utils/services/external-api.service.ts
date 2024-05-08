import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Post, User } from '../types/external-api.types';

@Injectable({
  providedIn: 'root'
})
export class ExternalApiService {

  constructor(private readonly http: HttpClient) { }

  public getPosts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>('/posts');
  }

  public getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>('/users');
  }

  public getUserInfo(userId: number = 1): Observable<User> {
    return this.http.get<User>('/users/' + userId);
  } 
}
