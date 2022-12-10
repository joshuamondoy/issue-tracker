import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';
import { User } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-open-issues',
  templateUrl: './open-issues.component.html',
  styleUrls: ['./open-issues.component.scss'],
})
export class OpenIssuesComponent implements OnInit {
  faUser = faUser;
  faUserXmark = faUserXmark;
  users!: User[];
  tickets!: Ticket[];
  numberOfTickets: number = 0;
  constructor(
    private httpService: HttpService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.getTickets();
    this.getUserName();
    this.getUsers();
    this.refreshData();
  }
  private getUserName() {
    const currentUserEmail = JSON.parse(
      localStorage.getItem('currentUserEmail')!
    );
    this.httpService.getUser(currentUserEmail).subscribe((res) => {
      this.utilityService.loggedUser.next(res);
      localStorage.setItem('currentUser', res.firstName + ' ' + res.lastName);
    });
  }
  private getUsers() {
    this.httpService.getUsers().subscribe((res) => (this.users = res));
  }
  private getTickets() {
    this.httpService.getOpenTickets().subscribe((res) => {
      this.tickets = res.reverse();
      this.numberOfTickets = res.length;
    });
  }
  private refreshData() {
    this.httpService.refresh$.subscribe(() => this.getTickets());
  }
}
