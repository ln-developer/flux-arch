export class GetUser {
  static readonly type = '[User] Get User Info';
  constructor(public userId?: number) {}
}

export class GetUsers {
  static readonly type = '[User] Get Users List';
}