import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';
import { HttpService } from 'src/app/services/http.service';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-closed-issues',
  templateUrl: './closed-issues.component.html',
  styleUrls: ['./closed-issues.component.scss'],
})
export class ClosedIssuesComponent implements OnInit {
  faRotateLeft = faRotateLeft;
  faCircleMinus = faCircleMinus;
  tickets!: Ticket[];
  reopenedTicket!: Ticket;
  numberOfTickets: number = 0;
  userName!: string;
  constructor(
    private httpService: HttpService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.getTickets();
    this.getUserName();
    this.httpService.refresh$.subscribe(() => {
      this.getTickets();
    });
  }
  private getTickets() {
    this.httpService.getClosedTickets().subscribe((res) => {
      this.tickets = res.reverse();
      this.numberOfTickets = res.length;
    });
  }
  private getUserName() {
    this.userName = localStorage.getItem('currentUser')!;
  }
  deleteTicket(id: number) {
    this.httpService.deleteTicket(id).subscribe();
  }
  reopenTicket(id: number) {
    this.httpService.getTicket(id).subscribe((res) => {
      let reopenedTicket = new Ticket(
        res.ticketId,
        res.ticketNumber,
        res.subject,
        res.description,
        this.utilityService.getDateNow(),
        this.userName!,
        res.assignedTo,
        this.utilityService.getStatus(true)
      );
      console.log(reopenedTicket);

      this.httpService.updateTicket(res.ticketId, reopenedTicket).subscribe();
    });
  }
}
