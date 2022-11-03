import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Ticket } from '../models/ticket.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private url = 'http://localhost:8080/issuetracker-api';
  private _refresh$ = new Subject<void>();
  constructor(private httpClient: HttpClient) {}

  get refresh$() {
    return this._refresh$;
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + '/users');
  }

  getTickets(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(this.url + '/tickets').pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  getTicket(ticketId: number): Observable<Ticket> {
    return this.httpClient.get<Ticket>(this.url + '/tickets/' + ticketId);
  }

  createTicket(ticket: Ticket) {
    return this.httpClient.post(this.url + '/tickets' + '/add-ticket', ticket);
  }
  updateTicket(id: number, ticket: Ticket) {
    return this.httpClient.put(this.url + '/tickets/' + id, ticket).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
}
