import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  public isLoggedIn = new Subject<number>();
  public loggedUser = new Subject<User>();

  constructor() {}

  getDateNow() {
    return new Date().toISOString().split('T')[0];
  }
  getStatus(status: boolean) {
    return status ? 'Open' : 'Closed';
  }
}
