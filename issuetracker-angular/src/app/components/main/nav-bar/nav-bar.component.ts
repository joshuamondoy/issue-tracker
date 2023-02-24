import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Ticket } from 'src/app/models/ticket.model';
import { User } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  faUser = faUser;
  dateNow = new Date().toISOString().split('T')[0];
  users!: User[];
  ticketNumber!: string;
  @ViewChild('formFields')
  ticketForm!: NgForm;
  unassign: any = null;
  numberOfOpenTickets: number = 0;
  numberOfClosedTickets: number = 0;
  isLoggedIn: number = 0;
  userName?: string;
  constructor(
    private httpService: HttpService,
    private utilityService: UtilityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getUserName();
    this.refreshData();
    this.checkIfLoggedIn();
    this.getNumberOfOpenTicket();
    this.getNumberOfClosedTicket();
  }

  private checkIfLoggedIn() {
    //check upon login
    this.utilityService.isLoggedIn.subscribe((res) => {
      this.isLoggedIn = res;
    });
    //check after viewing ticket
    this.isLoggedIn = Number(localStorage.getItem('isLoggedIn'));
  }
  private refreshData() {
    this.httpService.refresh$.subscribe(() => {
      this.getUserName();
      this.getUsers();
      this.getNumberOfOpenTicket();
      this.getNumberOfClosedTicket();
    });
  }
  private getUsers() {
    this.httpService.getUsers().subscribe((res) => (this.users = res));
  }
  private getUserName() {
    this.utilityService.loggedUser.subscribe(
      (res) => (this.userName = res.firstName + ' ' + res.lastName)
    );
  }
  private getNumberOfOpenTicket() {
    this.httpService
      .getOpenTickets()
      .subscribe((res) => (this.numberOfOpenTickets = res.length));
  }
  private getNumberOfClosedTicket() {
    this.httpService
      .getClosedTickets()
      .subscribe((res) => (this.numberOfClosedTickets = res.length));
  }
  logOut() {
    this.utilityService.isLoggedIn.next(0);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentUser');
    this.userName = '';
  }
  createTicketNumber() {
    return (this.ticketNumber = (
      'RITM' + Math.floor(Math.random() * 10000000000)
    ).toString());
  }

  onSubmit(formFields: NgForm) {
    this.createTicketNumber();

    const formField = formFields.value;
    const subject = formField.subject;
    const newIssue = new Ticket(
      0,
      this.ticketNumber,
      subject.charAt(0).toUpperCase() + subject.slice(1),
      formField.description,
      this.dateNow,
      this.userName!,
      formField.assignedto == null ? 'Unassign' : formField.assignedto,
      'Open'
    );
    this.httpService.createTicket(newIssue).subscribe();
    alert('Issue added!');
    this.ticketForm.reset();
  }

  onSearch(formField: NgForm) {
    this.httpService
      .searchTicket(formField.value.searchItem)
      .subscribe((res) => this.utilityService.searchedTicket.next(res));
    this.router.navigate(['issues/search-ticket']);
  }
}
