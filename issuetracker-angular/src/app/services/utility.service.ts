import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

  getDateNow() {
    return new Date().toISOString().split('T')[0];
  }
  getStatus(status: boolean) {
    return status ? 'Open' : 'Closed';
  }

  assignTicket(user?: string) {
    return user == '' ? 'Unassign' : user;
  }
}
