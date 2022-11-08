import { Component, OnInit } from '@angular/core';
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
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  onSubmit(formValues: NgForm) {
    const value = formValues.value;
    const newIssue = new Ticket(
      0,
      'RITM0524199504',
      value.subject,
      value.description,
      this.dateNow,
      'Joshua Mondoy',
      value.assignedTo == '' ? 'Unassign' : value.assignedTo,
      'Open',
      '',
      '',
      ''
    );
    this.httpService.createTicket(newIssue).subscribe();
  }
}
