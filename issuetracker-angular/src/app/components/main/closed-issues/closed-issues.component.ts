import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';
import { HttpService } from 'src/app/services/http.service';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';

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
  dateNow = new Date().toISOString().split('T')[0];
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getTickets();
    this.httpService.refresh$.subscribe(() => {
      this.getTickets();
    });
  }
  private getTickets() {
    this.httpService.getClosedTickets().subscribe((res) => {
      this.tickets = res;
    });
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
        this.dateNow,
        res.openedBy,
        'Unassign',
        'Open',
        '',
        '',
        ''
      );
      this.httpService.updateTicket(res.ticketId, reopenedTicket).subscribe();
    });
  }
}
