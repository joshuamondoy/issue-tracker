import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/models/ticket.model';
import { User } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-view-issues',
  templateUrl: './view-issues.component.html',
  styleUrls: ['./view-issues.component.scss'],
})
export class ViewIssuesComponent implements OnInit {
  ticket!: Ticket;
  ticketId!: number;
  ticketNumber!: string;
  subject!: string;
  description!: string;
  dateCreated!: string;
  openedBy!: string;
  assignedTo!: any;
  status!: any;
  dateClosed!: string;
  closedBy!: string;
  resolution!: string;
  users!: User[];
  editMode: boolean = false;
  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.ticketId = parseInt(res['id']);
    });
    this.getTicket();
    this.getUsers();
    this.httpService.refresh$.subscribe(() => {
      this.getTicket();
    });
  }
  private getTicket() {
    this.httpService.getTicket(this.ticketId).subscribe((res) => {
      this.ticketId = res.ticketId;
      this.ticketNumber = res.ticketNumber;
      this.subject = res.subject;
      this.description = res.description;
      this.dateCreated = res.dateCreated;
      this.openedBy = res.openedBy;
      this.assignedTo = res.assignedTo;
      this.status = res.status;
    });
  }
  private getUsers() {
    this.httpService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  onSubmit(formValues: NgForm) {
    this.editMode = !this.editMode;
    const value = formValues.value;

    this.ticket = new Ticket(
      this.ticketId,
      this.ticketNumber,
      value.subject,
      value.description,
      this.dateCreated,
      this.openedBy,
      value.assignedTo,
      'Open',
      '',
      '',
      ''
    );
    this.httpService.updateTicket(this.ticketId, this.ticket).subscribe();
  }
}
