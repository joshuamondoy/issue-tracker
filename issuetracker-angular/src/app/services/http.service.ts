import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Ticket } from '../models/ticket.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private url = 'http://localhost:8080/issuetracker-api';
  private _refresh$ = new Subject<void>();
  public numberOfOpenTickets = new Subject<number>();
  public numberOfClosedTickets = new Subject<number>();
  constructor(private httpClient: HttpClient) {}

  get refresh$() {
    return this._refresh$;
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + '/users');
  }

  getOpenTickets(): Observable<Ticket[]> {
    return this.httpClient
      .get<Ticket[]>(this.url + '/tickets')
      .pipe(map((res) => res.filter((res) => res.status == 'Open')));
  }
  getClosedTickets(): Observable<Ticket[]> {
    return this.httpClient
      .get<Ticket[]>(this.url + '/tickets')
      .pipe(map((res) => res.filter((res) => res.status == 'Closed')));
  }

  getTicket(ticketId: number): Observable<Ticket> {
    return this.httpClient.get<Ticket>(this.url + '/tickets/' + ticketId);
  }

  createTicket(ticket: Ticket) {
    return this.httpClient
      .post(this.url + '/tickets' + '/add-ticket', ticket)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }
  addUser(user: User) {
    console.log(this.url + '/users' + '/add-user', user);

    return this.httpClient.post(this.url + '/add-user', user).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  updateTicket(id: number, ticket: Ticket) {
    return this.httpClient.put(this.url + '/tickets/' + id, ticket).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  deleteTicket(id: number) {
    return this.httpClient.delete(this.url + '/tickets/' + id).pipe(
      tap(() => {
        this.refresh$.next();
      })
    );
  }
}
