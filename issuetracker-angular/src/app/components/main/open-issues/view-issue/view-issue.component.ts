import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/models/ticket.model';
import { User } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-view-issue',
  templateUrl: './view-issue.component.html',
  styleUrls: ['./view-issue.component.scss'],
})
export class ViewIssueComponent implements OnInit {
  dateNow = new Date().toISOString().split('T')[0];
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
  @ViewChild('resolution') resolution!: string;
  users!: User[];
  editMode: boolean = false;
  closeMode: boolean = false;
  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.ticketId = parseInt(res['id']);
    });
    this.getTickets();
    this.getUsers();
    this.httpService.refresh$.subscribe(() => {
      this.getTickets();
    });
  }
  private getTickets() {
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

  toggleUpdate() {
    this.editMode = !this.editMode;
  }
  cancelUpdate() {
    this.editMode = !this.editMode;
  }
  cancelClose() {
    this.closeMode = !this.closeMode;
  }
  onUpdateTicket(formValues: NgForm) {
    const value = formValues.value;
    if (this.editMode) {
      this.editMode = !this.editMode;
      let ticket = new Ticket(
        this.ticketId,
        this.ticketNumber,
        value.subject,
        value.description,
        this.dateNow,
        this.openedBy,
        (value.assignedTo =
          value.assignedTo == '' ? 'Unassign' : value.assignedTo),
        'Open',
        '',
        '',
        ''
      );
      this.httpService.updateTicket(this.ticketId, ticket).subscribe();
    } else if (this.closeMode) {
      this.closeMode = !this.closeMode;
      let ticket = new Ticket(
        this.ticketId,
        this.ticketNumber,
        this.subject,
        this.description,
        this.dateNow,
        this.openedBy,
        this.assignedTo,
        'Closed',
        this.dateNow,
        'Joshua',
        value.resolution
      );
      this.httpService.updateTicket(this.ticketId, ticket).subscribe();
    }
  }
  toggleClose() {
    this.closeMode = !this.closeMode;
  }
}
