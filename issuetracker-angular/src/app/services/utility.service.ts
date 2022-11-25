import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  public isLoggedIn = new Subject<number>();
  public userEmail = new Subject<string>();

  constructor(private httpService: HttpService) {}

  getDateNow() {
    return new Date().toISOString().split('T')[0];
  }
  getStatus(status: boolean) {
    return status ? 'Open' : 'Closed';
  }
}
