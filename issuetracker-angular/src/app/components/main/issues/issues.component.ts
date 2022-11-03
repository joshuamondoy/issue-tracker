import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';
import { User } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  users!: User[];
  tickets!: Ticket[];
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getTickets();
    this.getUsers();
    this.httpService.refresh$.subscribe(() => {
      this.getTickets();
    });
  }
  private getUsers() {
    this.httpService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }
  private getTickets() {
    this.httpService.getTickets().subscribe((res) => {
      this.tickets = res.reverse();
    });
  }
}
