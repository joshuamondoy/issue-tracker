import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ticket } from 'src/app/models/ticket.model';
import { User } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  dateNow = new Date().toISOString().split('T')[0];
  users!: User[];
  ticketNumber!: string;
  @ViewChild('formValues')
  ticketForm!: NgForm;
  unassign: any = null;
  numberOfOpenTickets: number = 0;
  numberOfClosedTickets: number = 0;
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getUsers().subscribe((res) => {
      this.users = res;
    });
    this.httpService.numberOfOpenTickets.subscribe((res) => {
      this.numberOfOpenTickets = res;
    });
    this.httpService.numberOfClosedTickets.subscribe((res) => {
      this.numberOfClosedTickets = res;
    });
  }

  createTicketNumber() {
    return (this.ticketNumber = (
      'RITM' + Math.floor(Math.random() * 10000000000)
    ).toString());
  }

  onSubmit(formValues: NgForm) {
    this.createTicketNumber();

    const value = formValues.value;
    const newIssue = new Ticket(
      0,
      this.ticketNumber,
      value.subject,
      value.description,
      this.dateNow,
      'Joshua Mondoy',
      value.assignedto == null ? 'Unassign' : value.assignedto,
      'Open',
      '',
      '',
      ''
    );

    this.httpService.createTicket(newIssue).subscribe();
    alert('Issue added!');
    this.ticketForm.reset();
  }
}
