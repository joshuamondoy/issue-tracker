import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/models/ticket.model';
import { User } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http.service';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { faCancel } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-view-issue',
  templateUrl: './view-issue.component.html',
  styleUrls: ['./view-issue.component.scss'],
})
export class ViewIssueComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faFilePen = faFilePen;
  faFloppyDisk = faFloppyDisk;
  faCancel = faCancel;
  faChevronLeft = faChevronLeft;

  ticket?: Ticket;
  ticketId!: number;
  users!: User[];
  editMode: boolean = false;
  closeMode: boolean = false;
  userName?: string;
  userEmail!: string;
  isResolved: boolean = true;
  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.getUseId();
    this.getTicket();
    this.getUsers();
    this.refreshData();
    this.getUserName();
  }
  private getUseId() {
    this.activatedRoute.params.subscribe(
      (res) => (this.ticketId = parseInt(res['id']))
    );
  }
  private getTicket() {
    this.httpService.getTicket(this.ticketId).subscribe((res) => {
      this.ticket = res;
      this.ticketId = res.ticketId;
    });
  }
  private getUsers() {
    this.httpService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }
  private refreshData() {
    this.httpService.refresh$.subscribe(() => this.getTicket());
  }
  private getUserName() {
    this.userName = localStorage.getItem('currentUser')!;
  }
  toggleUpdate() {
    this.editMode = !this.editMode;
  }
  cancelUpdate() {
    this.editMode = !this.editMode;
  }
  toggleClose() {
    this.closeMode = !this.closeMode;
  }
  cancelClose() {
    this.closeMode = !this.closeMode;
  }
  backToIssues() {
    this.utilityService.isLoggedIn.next(1);
  }
  onUpdateTicket(formFields: NgForm) {
    const formField = formFields.value;
    const subject = formField.subject;
    let ticket: Ticket;
    if (this.editMode) {
      this.editMode = !this.editMode;
      ticket = new Ticket(
        this.ticketId,
        this.ticket!.ticketNumber,
        subject.charAt(0).toUpperCase() + subject.slice(1),
        formField.description,
        this.utilityService.getDateNow(),
        this.ticket!.openedBy,
        formField.assignedto == '' ? 'Unassign' : formField.assignedto,
        this.utilityService.getStatus(true)
      );
    } else if (this.closeMode) {
      this.closeMode = !this.closeMode;
      ticket = new Ticket(
        this.ticketId,
        this.ticket!.ticketNumber,
        this.ticket!.subject,
        this.ticket!.description,
        this.ticket!.dateCreated,
        this.ticket!.openedBy,
        this.ticket!.assignedTo,
        this.utilityService.getStatus(false),
        this.utilityService.getDateNow(),
        this.userName,
        formField.resolution
      );
      this.isResolved = false;
    }
    this.httpService.updateTicket(this.ticketId, ticket!).subscribe();
    this.editMode = false;
  }
}
